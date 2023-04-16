import Nav from "~/components/nav";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import Button from "~/components/common/button";
import { useSession } from "next-auth/react";
import CreateEvent from "~/components/events/create_event";
import { url } from "~/helper";

function formatDate(timeStr: string) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Add timezone offset to the date string
  const offset = new Date().getTimezoneOffset() / 60;
  const timeZoneOffset = `${(offset < 0 ? '+' : '-')}${('00' + Math.abs(offset)).slice(-2)}00`;
  const parsedTimeStr = timeStr.replace(/([-+]\d{4})$/, timeZoneOffset);

  // Parse the time string into a Date object
  const date = new Date(parsedTimeStr);

  // Get the day of the week, month, and day of the month
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  // Get the hour and minute
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Format the hour as 12-hour time
  const hourStr = hour > 12 ? hour - 12 : hour;
  const meridian = hour >= 12 ? 'p.m.' : 'a.m.';

  // Construct the formatted date string
  const fullYear = date.getFullYear();
  const formatedMinutes = minute.toString().padStart(2, '0');
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${fullYear} ${hourStr}:${formatedMinutes} ${meridian}`;

  return formattedDate;
}

export interface EventType {
  title: string,
  location: string,
  starts: string,
  ends: string,
  description: string,
  location_url: string,
  contact_name: string,
  contact_email: string,
  id?: string
  ucfevent?: boolean
}

function Events() {
  const { data } = useSession();
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  function sortByStartDate(events: EventType[]) {
    return events.sort((a, b) => {
      const aTime = new Date(a.starts).getTime();
      const bTime = new Date(b.starts).getTime();
      return bTime - aTime;
    });
  }

  useEffect(() => {
    if (!data?.user) return;
    axios.get('https://events.ucf.edu/upcoming/feed.json')
      .then((response: {data: Array<EventType>}) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i] = {...response.data[i] as EventType, ucfevent: true};
        }
        axios.get(`${url}/event?userId=${data?.user.id}`).then((response2) => {
          const eventsTotal = [...response.data, ...response2.data];
          sortByStartDate(eventsTotal);
          setEvents(eventsTotal);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }, [data]);

  function formatString(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  }

  function isAdmin() {
    return data?.user?.role === 'ADMIN' || data?.user?.role === 'SUPERADMIN';
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-col">
        <div className="flex m-5 items-center justify-between">
          <h1 className="text-4xl font-bold text-rose-500">Events</h1>
          {isAdmin() && <Button className="p-0 mt-0 w-32 h-12" value="Create Event" onClick={() => setShowPanel(!showPanel)}/>}
        </div>
        <ul>
          {events.map((event: EventType, index: number) => {
            const formatedTitle = formatString(event.title);
            return (
              <Link key={index} href={`/views/event/${event.id}/${formatedTitle}${(event.ucfevent) ? `?ucf=true` : ''}`}>
                <EventItem events={event} />
              </Link>
            )}
          )}
        </ul>
        <div
            className="fixed h-screen w-screen top-0 left-0 bg-black opacity-30"
            style={{display: (showPanel) ? undefined : 'none'}}
            onClick={() => {setShowPanel(false)}}
        />
        <div
          className="fixed left-1/4 w-1/2 bg-white rounded-xl p-10"
          style={{display: (showPanel) ? undefined : 'none'}}
        >
          <CreateEvent setShowPanel={setShowPanel} />
        </div>
      </div>
    </div>
  );
}

function EventItem(props: {events: EventType}) {
  return (
    <li className="m-5 bg-gray-200 hover:bg-gray-300 cursor-pointer p-2">
      <p className="text-2xl font-bold underline text-rose-500">{props.events.title}</p>
      <p className="text-xl pt-2 font-bold">{formatDate(props.events.starts)}</p>
      <p className="text-xl font-bold py-2">{props.events.location}</p>
      <div dangerouslySetInnerHTML={{ __html: props.events.description }} />
    </li>
  );
}

export default Events;

