import Link from "next/link";
import Nav from "~/components/nav";
import Button from "~/components/common/button";
import { useEffect, useState } from "react";
import { RSO } from "@prisma/client";
import { url } from "~/helper";
import axios from "axios";
import CreateRSO from "~/components/rsos/create_rso";
import { useSession } from "next-auth/react";

const RSOs = () => {
  const { data } = useSession();
  const [rsos, setRSOs] = useState<RSO[]>();
  const [showPanel, setShowPanel] = useState<boolean>(false);
  
  useEffect(() => {
    if (!data?.user) return;
    axios.get(`${url}/rso?userId=${data?.user.id}`).then(({ data }: { data: RSO[] }) => {
      setRSOs(data)
    }).catch(() => {return;});
  }, [data])

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