import Link from "next/link";
import Nav from "~/components/nav";
import Button from "~/components/common/button";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { RSO } from "@prisma/client";
import { url } from "~/helper";
import axios from "axios";
const rsos = Array(10).fill({
  
    id: 1,
    name: "Cookie Club",
    description: "A club that teaches students to bake the most delicious cookies."
  
}) 

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
  console.log("This is the index")
  const [rsos, setRSOs] = useState<RSO[]>();
  useEffect(() => {
    axios.get(`${url}/rso`).then(({ data }: { data: RSO[] }) => {
      setRSOs(data)
    }).catch(() => {return;});
  }, [])
  return (
    <div>
      <Nav />
      <div className="flex justify-between m-5">
        <h1 className="text-rose-500 text-6xl underline">Registered Student Organizations</h1>
        <Button value="Create RSO"/>
      </div>
      <ul id = "list"></ul>
      {rsos?.map((rso,index)=>{
        return <Link href = {`/views/rso/${rso.id}`} key = {index} >
          <div className="m-5 bg-gray-200 hover:bg-gray-300 cursor-pointer p-2">
            <p className="text-2xl font-bold underline text-rose-500">{rso.name}</p>
            <div>{rso.description}</div>
          </div>
        </Link>
      })}
    </div>
    );
};

export default RSOs;

// Stuff to add: button that allows a user to create an rso
// File to look for to