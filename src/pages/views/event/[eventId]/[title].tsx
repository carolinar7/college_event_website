import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLocationSharp, IoMail, IoPerson } from "react-icons/io5";
import Map from "~/components/common/map";
import Nav from "~/components/nav";
import { EventType } from "..";
import loadingGif from '../../../../assets/loadingGif.gif';
import Image from "next/image";
import Comments from "~/components/comments";
import SocialMediaShare from "~/components/share";

const EmptyEvent = {
  id: '',
  contact_email: '',
  contact_name: '',
  description: '',
  ends: '',
  location: '',
  location_url: '',
  starts: '',
  title: '',
} as EventType;

const Event = () => {
  const router = useRouter();
  const eventID = router.query?.eventId as string;
  const title = router.query?.title as string;

  const [events, setEvents] = useState<EventType>(EmptyEvent);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!eventID) return;
    axios.get(`https://events.ucf.edu/event/${eventID}/${title}/feed.json`).then(({ data }) => {
      const formattedData = {
        ...data,
        starts: new Date(data.starts).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
        ends: new Date(data.ends).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      };
      setEvents(formattedData);
      setLoading(false);
    }).catch(() => {return;});
  }, [eventID])

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex h-screen justify-center items-center">
          <Image height={250} width={250} src={loadingGif} alt='loading'/>
        </div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="m-5 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <p className="text-4xl font-bold underline text-rose-500">{events.title}</p>
          <div className="py-2 flex">
            <p className="text-xl font-bold">{events.starts}</p>
            <p className="text-xl font-bold ml-2">to {events.ends}</p>
          </div>
          <div className="max-w-3xl overflow-hidden" dangerouslySetInnerHTML={{ __html: events.description }} />
          <p className="py-2 max-w-3xl overflow-hidden"><Map location_url={events.location_url}/></p>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <div>
              <p className="text-2xl font-bold">Location:</p>
              <div className="flex py-2 items-center">
              <p className="text-xl mr-2"><IoLocationSharp /></p>
              <p>{events.location}</p>
              </div>
            </div>
            <div className="border-b border-gray-400"></div>
            <div className="flex flex-col ">
              <p className="pt-2 text-2xl font-bold">Contact:</p>  
              <div className="flex py-2 items-center">
                <p className="text-xl mr-2"><IoPerson /></p>
                <p>{events.contact_name}</p>
              </div>
              <div className="flex py-2 items-center">
                <p className="text-xl mr-2"><IoMail /></p>
                <p>{events.contact_email}</p>
              </div>
              <div className="border-b border-gray-400"></div>
              <div>
              <p className="pt-2 text-2xl font-bold">Share:</p>  
              <p className="py-2"><SocialMediaShare/></p>
              </div>
              <div className="border-b border-gray-400"></div>
              <div>
              <p className="pt-2 text-2xl font-bold">Comments:</p>  
              <p className="py-2"><Comments/></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
