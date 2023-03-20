import PublicEventRequestListItem from "~/components/admin_dashboard/public_event_request/public_event_request_item";
import SidePanel from "~/components/admin_dashboard/side_panel";
import Nav from "~/components/nav";

const MockData = Array(10).fill({
  name: 'Resume Review',
  type: 'Personal Development',
  time: '3 - 5 PM',
  date: 'May 15, 2023',
  location: 'HEC 101',
  admin: 'John Doe',
  phone: '111-111-1111',
  email: 'johndoe@knights.ucf.edu',
  description: 'Resume Review Day is a perfect opportunity for you to share your expertise and meet our students 1:1, some of whom are interested in your organization or industry, and others that are just looking for a professional\'s opinion. You will review a student\'s resume, and if appropriate, exchange contact information and invite them to learn more about your organization at one of the Career Fairs – all in under 10 minutes!',
}) as Array<{
  name: string,
  type: string,
  time: string,
  date: string,
  admin: string,
  phone: string,
  email: string,
  description: string,
}>

const PublicEventRequests = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>Public Event Requests</div>
        {MockData.map((item, idx) => {
          return <PublicEventRequestListItem item={item} key={idx}/>
        })}
      </SidePanel>
    </div>
  );
};

export default PublicEventRequests;