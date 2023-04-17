import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMail, IoPerson } from "react-icons/io5";
import Button from "~/components/common/button";
import Nav from "~/components/nav";
import { url } from "~/helper";
import Image from "next/image";
import loadingGif from '../../../assets/loadingGif.gif';
import { useSession } from "next-auth/react";


const RSO = () => {
  const { data } = useSession();
  const router = useRouter();
  const rsoID = router.query?.rsoId;
  const [rso,setRSO] = useState<any>();
  const [isMember,setIsMember] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (!rsoID || !data?.user.id) return;
    axios.get(`${url}/rso/${rsoID}`).then(({ data }) => {
      setRSO(data);
      setLoading(false);
    }).catch(() => {return;});
    axios.get(`${url}/rso/${rsoID}?userId=${data?.user.id}`).then(({ data }) => {
      setIsMember(data);
    }).catch(() => {return;});
  }, [rsoID, data])

  const joinRSO = async () => {
    await axios.post(`${url}/rso/${rsoID}`, {
      memberId: data?.user.id,
    }).then(() => {
      setIsMember(!isMember);
    }).catch(() => {return;});
  }

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

  return <>
    <Nav />
    <div className="m-5 flex flex-col">
        <div className="flex justify-between">
          <div className="col-span-8">
            <p className="text-4xl font-bold underline text-rose-500 mb-5">{rso?.name}</p>
            <Image src={rso.image_url} alt="image" width={500} height={200} className="mb-5"/>
            <div className="max-w-3xl overflow-hidden"  >{rso?.description}</div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col h-full">
              <Button className='mb-5' value={(isMember) ? "Leave RSO" : "Join RSO"} onClick={() => joinRSO()} />
              <div className="border-b border-gray-400"></div>
              <div className="flex flex-col ">
                <p className="pt-2 text-2xl font-bold">Contact:</p>
                <div className="flex py-2 items-center">
                  <p className="text-xl mr-2"><IoPerson /></p>
                  <p>{rso?.User?.fName + " " + rso?.User?.lName}</p>
                </div>
                <div className="flex py-2 items-center">
                  <p className="text-xl mr-2"><IoMail /></p>
                  <p>{rso?.User?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>;
}

// Stuff to add in the future:
/*
  button that allows a user to request to join an RSO
  
 */

export default RSO;