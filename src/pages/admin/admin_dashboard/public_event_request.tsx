import axios from "axios";
import { useEffect, useState } from "react";
import PublicEventRequestListItem from "~/components/admin_dashboard/public_event_request/public_event_request_item";
import SidePanel from "~/components/admin_dashboard/side_panel";
import Nav from "~/components/nav";
import { url } from "~/helper";

const PublicEventRequests = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${url}/event?status=pending`).then(({ data }) => {
      setEvents(data);
      setLoading(false);
    }).catch(() => {return;});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>Public Event Requests</div>
        {!loading && events.map((item, idx) => {
          return <PublicEventRequestListItem item={item} key={idx} events={events} setEvents={setEvents}/>
        })}
      </SidePanel>
    </div>
  );
};

export default PublicEventRequests;