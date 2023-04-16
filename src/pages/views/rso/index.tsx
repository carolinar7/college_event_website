import Link from "next/link";
import Nav from "~/components/nav";
import Button from "~/components/common/button";
import { useEffect, useState } from "react";
import { RSO } from "@prisma/client";
import { url } from "~/helper";
import axios from "axios";
import CreateRSO from "~/components/rsos/create_rso";

// Stuff to do now
// Make the text prettier
// Enable making a request to create a new RSO
// Be able to click into an RSO, which takes you to the RSO's information
// Look in the admin-> university folder for inspiration

// In the future work on backend, like the Database. But for now you're almost done.


//For next time:
/*
We can display RSOs to the screen. 
We need to create the RSOs.
We need to implement the new API, by making the get request
We need to make another API to join an RSO.

For now, just remember to display certain data when you click on an RSO. Try to use data from the database when showing this page. It is similar to displaying info for RSOs.
*/
const RSOs = () => {
  const [rsos, setRSOs] = useState<RSO[]>();
  const [showPanel, setShowPanel] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${url}/rso`).then(({ data }: { data: RSO[] }) => {
      setRSOs(data)
    }).catch(() => {return;});
  }, [])

  return (
    <div>
      <Nav />
      <div className="flex flex-col">
        <div className="flex m-5 items-center justify-between">
          <h1 className="text-4xl font-bold text-rose-500">Registered Student Organizations</h1>
          <Button className='p-0 mt-0 w-32 h-12' value="Create RSO" onClick={() => setShowPanel(true)}/>
        </div>
        {rsos?.map((rso,index)=>{
          return <Link href = {`/views/rso/${rso.id}`} key = {index} >
            <div className="mx-5 mb-5 bg-gray-200 hover:bg-gray-300 cursor-pointer p-2">
              <p className="text-2xl mb-2 font-bold underline text-rose-500">{rso.name}</p>
              <div>{rso.description}</div>
            </div>
          </Link>
        })}
        <div
          className="fixed h-screen w-screen top-0 left-0 bg-black opacity-30"
          style={{display: (showPanel) ? undefined : 'none'}}
          onClick={() => {setShowPanel(false)}}
        />
        <div
          className="fixed left-1/4 w-1/2 bg-white rounded-xl p-10"
          style={{display: (showPanel) ? undefined : 'none'}}
        >
          <CreateRSO setShowPanel={setShowPanel} />
        </div>
      </div>
    </div>
    );
};

export default RSOs;