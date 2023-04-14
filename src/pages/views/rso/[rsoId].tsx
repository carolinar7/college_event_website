import { useRouter } from "next/router";
import { IoMail, IoPerson } from "react-icons/io5";
import Button from "~/components/common/button";
import Nav from "~/components/nav";

const singleRSO = {
  name: "Cookie Club",
  description: "A club that teaches students to bake the most delicious cookies.",
  studentAdmin: "Cookie Monster",
  adminContactInfo: "cookieMonster@knights.ucf.edu"
}

const RSO = () => {
  const router = useRouter();

  console.log(router.query?.rsoId);
  console.log("Heya");
  return <>
    <Nav />
    <div className="m-5 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <p className="text-4xl font-bold underline text-rose-500 mb-3">{singleRSO.name}</p>
          <div className="max-w-3xl overflow-hidden"  >{singleRSO.description}</div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <div className="border-b border-gray-400"></div>
            <div className="flex flex-col ">
              <Button value="Join RSO"/>
              <p className="pt-2 text-2xl font-bold">Contact:</p>  
              <div className="flex py-2 items-center">
                <p className="text-xl mr-2"><IoPerson /></p>
                <p>{singleRSO.studentAdmin}</p>
              </div>
              <div className="flex py-2 items-center">
                <p className="text-xl mr-2"><IoMail /></p>
                <p>{singleRSO.adminContactInfo}</p>
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