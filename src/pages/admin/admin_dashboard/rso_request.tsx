import RSORequestListItem from "~/components/admin_dashboard/rso_request.tsx/rso_request_list_item";
import SidePanel from "~/components/admin_dashboard/side_panel";
import Nav from "~/components/nav";

const MockData = Array(10).fill({
  name: 'Society of Hispanic Professional Engineers',
  admin: 'johndoe@knights.ucf.edu',
  supporting_students: ['johndoe@knights.ucf.edu', 'johndoe@knights.ucf.edu', 'johndoe@knights.ucf.edu'],
  description: 'The Society of Hispanic Professional Engineers was founded in Los Angeles, California in 1974 by a group of engineers employed by the city of Los Angeles. Their objective was to form a National organization of professional engineers to serve as role models in the Latino community.',
}) as Array<{
  name: string,
  admin: string,
  supporting_students: string[],
  description: string,
}>

const RSORequest = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>RSO Requests</div>
        {MockData.map((item, idx) => {
          return <RSORequestListItem item={item} key={idx}/>
        })}
      </SidePanel>
    </div>
  );
};

export default RSORequest;