import SidePanel from "~/components/admin_dashboard/side_panel";
import Nav from "~/components/nav";

const PublicEventRequests = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>Public Event Requests</div>
      </SidePanel>
    </div>
  );
};

export default PublicEventRequests;