import { University } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import SidePanel from "~/components/admin_dashboard/side_panel";
import Button from "~/components/common/button";
import Nav from "~/components/nav";
import { url } from "~/helper";

const University = () => {
  const router = useRouter();
  const universityId = router.query?.universityId as string;

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [numStudents, setNumStudents] = useState<number>(0);
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if (!universityId) return;
    axios.get(`${url}/university/${universityId}`).then(({ data }: { data: University }) => {
      setName(data.name);
      setLocation(data.location);
      setDescription(data.description);
      setNumStudents(data.numStudents);
      setEmailDomain(data.emailDomain);
    }).catch(() => {return;});
  }, [universityId])

  const onUpdateUniversity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    await axios.post(`${url}/university/${universityId}`, {
      name: name,
      location: location,
      description: description,
      numStudents: numStudents,
      emailDomain: emailDomain,
    })
    setDisableButton(false);
  };

  const onDeleteUniversity = async () => {
    await axios.delete(`${url}/university/${universityId}`);
    await router.push('/admin/admin_dashboard/university');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <SidePanel>
        <Link  className='self-start justify-self-start mt-10' href='/admin/admin_dashboard/university'>
          <IoArrowBackOutline style={{color: "#F43F5E"}} size={25}/>
        </Link>
        <div className='mt-5 ml-10'>
          <form className='flex flex-col' onSubmit={(e) => {onUpdateUniversity(e).catch(() => {return})}}>
            <label className='text-xl font-bold mb-3'>University Name</label>
            <input className='border-b-2 border-rose-500 mb-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
            <label className='text-xl font-bold mb-3'>Location</label>
            <input className='border-b-2 border-rose-500 mb-3' type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
            <label className='text-xl font-bold mb-3'>Description</label>
            <textarea rows={3} className='border-b-2 border-rose-500 mb-3' name="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            <label className='text-xl font-bold mb-3'>Number of Students</label>
            <input className='border-b-2 border-rose-500 mb-3' type="number" name="numStudents" value={numStudents} onChange={(e) => setNumStudents(e.target.valueAsNumber)} required/>
            <label className='text-xl font-bold mb-3'>Email Domain</label>
            <input className='border-b-2 border-rose-500' type="string" placeholder='knights.ucf.edu' name="emailDomain" value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)} required/>
            <div className='flex'>
              <Button className='mb-3 mr-5' value='Save' type='submit' style={(disableButton) ? {opacity: .75} : undefined}/>
              <Button className='!bg-red-500 mb-3' value='Delete' onClick={() => {onDeleteUniversity().catch(() => {return})}}/>
            </div>
          </form>
        </div>
      </SidePanel>
    </div>
  );
}

export default University;