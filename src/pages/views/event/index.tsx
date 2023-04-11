import Nav from "~/components/nav";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

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
}

const fakeData = Array (10).fill({
    title: "Music Festival",
    location: "Central Park",
    starts: "Tue, 11 Apr 2023 18:00:00 -0400",
    ends: "Tue, 11 Apr 2023 19:00:00 -0400",
    description: "A weekend of live music in the heart of the city.",
    location_url: "https://example.com/music-festival",
    contact_name: "Jane Smith",
    contact_email: "jane.smith@example.com",
    id: "123"
})

function Events() {
  const [events, setEvents] = useState<Array<EventType>>([]);

  function sortByStartDate(events: EventType[]) {
    return events.sort((a, b) => {
      const aTime = new Date(a.starts).getTime();
      const bTime = new Date(b.starts).getTime();
      return aTime - bTime;
    });
  }
  

  useEffect(() => {
    axios.get('https://events.ucf.edu/upcoming/feed.json')
      .then((response: {data: Array<EventType>}) => {
        const eventsTotal = [...response.data, ...fakeData];
        sortByStartDate(eventsTotal);
        console.log(eventsTotal);
        setEvents(eventsTotal);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function formatString(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  }

  return (
    <div>
      <Nav />
      <ul>
        {events.map((event: EventType, index: number) => {
          const formatedTitle = formatString(event.title);
          return (
            <Link key={index} href={`/views/event/${event.id}/${formatedTitle}`}>
              <EventItem events={event} />
            </Link>
          )}
        )}
      </ul>
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

