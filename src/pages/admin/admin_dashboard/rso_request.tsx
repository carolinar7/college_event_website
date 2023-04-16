import axios from "axios";
import { useEffect, useState } from "react";
import RSORequestListItem from "~/components/admin_dashboard/rso_request.tsx/rso_request_list_item";
import SidePanel from "~/components/admin_dashboard/side_panel";
import Nav from "~/components/nav";
import { url } from "~/helper";

const RSORequest = () => {
  const [rsos, setRSOs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${url}/rso?status=pending`).then(({ data }) => {
      setRSOs(data);
      setLoading(false);
    }).catch(() => {return;});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>RSO Requests</div>
        {!loading && rsos.map((item, idx) => {
          return <RSORequestListItem item={item} key={idx} rsos={rsos} setRSOs={setRSOs}/>
        })}
      </SidePanel>
    </div>
  );
};

export default RSORequest;