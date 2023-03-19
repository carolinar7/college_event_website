import { type University } from "@prisma/client";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useQuery } from "react-query";
import SidePanel from "~/components/admin_dashboard/side_panel";
import CreateUniversity from "~/components/admin_dashboard/university/create_university";
import UniversityListItem from "~/components/admin_dashboard/university/university_list_item";
import Nav from "~/components/nav";
import { url } from "~/helper";

const Universities = () => {
  const { data } = useQuery('universities', (): Promise<University[]> => fetch(`${url}/university`).then(res => res.json()));
  const [showPanel, setShowPanel] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <div className='ml-5 mt-5 font-bold text-4xl text-rose-500'>Universities</div>
        {data?.map((item) => {
          return <UniversityListItem item={item} key={item.id}/>
        })}
        <button
          className='flex fixed shadow-lg bottom-10 right-10 items-center justify-center h-16 w-16 rounded-full bg-rose-500'
          onClick={() => {setShowPanel(true)}}
        >
          <IoAdd color='white' size={25}/>
        </button>
        <div
          className="fixed h-screen w-screen top-0 left-0 bg-black opacity-30"
          style={{display: (showPanel) ? undefined : 'none'}}
          onClick={() => {setShowPanel(false)}}
        >
        </div>
        <div
          className="fixed top-36 left-1/4 w-1/2 bg-white rounded-xl p-10"
          style={{display: (showPanel) ? undefined : 'none'}}
        >
          <CreateUniversity setShowPanel={setShowPanel} universities={data as University[]}/>
        </div>
      </SidePanel>
    </div>
  );
};

export default Universities;