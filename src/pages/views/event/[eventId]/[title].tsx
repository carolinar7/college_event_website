import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLocationSharp, IoMail, IoPerson } from "react-icons/io5";
import Map from "~/components/common/map";
import Nav from "~/components/nav";
import loadingGif from '../../../../assets/loadingGif.gif';
import Image from "next/image";
import Comments from "~/components/comments";
import { url } from "~/helper";
import { useSession } from "next-auth/react";

const Event = () => {
  const router = useRouter();
  const eventID = router.query?.eventId as string;
  const title = router.query?.title as string;
  const ucf = router.query?.ucf;

  const [events, setEvents] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!eventID) return;
    if (ucf === 'true') {
      axios.get(`https://events.ucf.edu/event/${eventID}/${title}/feed.json`).then(({ data }) => {
        const formattedData = {
          ...data,
          starts: new Date(data.starts).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
          ends: new Date(data.ends).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        };
        setEvents(formattedData);
        setLoading(false);
      }).catch(() => {return;});
    } else {
      axios.get(`${url}/event/${eventID}`).then(({ data }) => {
        const formattedData = {
          ...data,
          starts: new Date(data.starts).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
          ends: new Date(data.ends).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
          contact_name: data.fName + " " + data.lName,
          contact_email: data.email,
        };
        setEvents(formattedData);
        setLoading(false);
      }).catch(() => {return;});
    }
  }, [eventID, ucf])

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
      <div className="m-5 flex flex-col items-center">
        <div className='flex justify-between'>
          <div className="col-span-8 mr-10">
            <div className="text-4xl font-bold mb-5 underline text-rose-500">{events.title}</div>
            {!ucf && <Image src={events.image_url} alt="image" width={500} height={200}/>}
            <div className="py-2 flex">
              <div className="text-xl font-bold">{events.starts}</div>
              <div className="text-xl font-bold ml-2">to {events.ends}</div>
            </div>
            <div className="max-w-3xl overflow-hidden" dangerouslySetInnerHTML={{ __html: events.description }} />
            <div className="py-2 max-w-3xl overflow-hidden"><Map location_url={events.location_url}/></div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col h-full">
              <div>
                <div className="text-2xl font-bold">Location:</div>
                <div className="flex py-2 items-center">
                  <div className="text-xl mr-2"><IoLocationSharp /></div>
                  <div>{events.location}</div>
                </div>
              </div>
              <div className="border-b border-gray-400"></div>
              <div className="flex flex-col ">
                <div className="pt-2 text-2xl font-bold">Contact:</div>
                <div className="flex py-2 items-center">
                  <div className="text-xl mr-2"><IoPerson /></div>
                  <div>{events.contact_name}</div>
                </div>
                <div className="flex py-2 items-center">
                  <div className="text-xl mr-2"><IoMail /></div>
                  <div>{events.contact_email}</div>
                </div>
                {(!ucf) &&
                  <div className="flex flex-col">
                    <div className="border-b border-gray-400"></div>
                    <div className="pt-2 text-2xl font-bold">Share:</div>  
                    <div className="py-2"><SocialMediaShare/></div>
                    <div className="pt-2 text-2xl font-bold">Comments:</div>
                    <div className="py-2"><Comments eventId={eventID}/></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
