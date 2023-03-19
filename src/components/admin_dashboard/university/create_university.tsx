import { type University } from "@prisma/client";
import axios from "axios";
import { type FormEvent, useState, type SetStateAction, type Dispatch } from "react";
import { url } from "~/helper";

interface CreateUniversityProps {
  setShowPanel: Dispatch<SetStateAction<boolean>>,
  universities: University[],
}

const CreateUniversity = ({ setShowPanel, universities }: CreateUniversityProps) => {
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [numStudents, setNumStudents] = useState<number>(0);
  const [emailDomain, setEamilDomain] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  
  const onCreateUniversity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    await axios.post(`${url}/university`, {
      name: name,
      location: location,
      description: description,
      numStudents: numStudents,
      emailDomain: emailDomain,
    }).then(({ data }: { data: University }) => {
      universities.unshift(data);
    });

    setShowPanel(false);

    setName('');
    setLocation('');
    setDescription('');
    setNumStudents(0);
    setEamilDomain('');
    setDisableButton(false);
  }
  
  return (
    <form className='flex flex-col' onSubmit={(e) => {onCreateUniversity(e).catch(() => {return})}}>
    <label className='text-xl font-bold mb-3'>University Name</label>
    <input className='border-b-2 border-rose-500 mb-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
    <label className='text-xl font-bold mb-3'>Location</label>
    <input className='border-b-2 border-rose-500 mb-3' type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
    <label className='text-xl font-bold mb-3'>Description</label>
    <textarea rows={3} className='border-b-2 border-rose-500 mb-3' name="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
    <label className='text-xl font-bold mb-3'>Number of Students</label>
    <input className='border-b-2 border-rose-500 mb-3' type="number" name="numStudents" value={numStudents} onChange={(e) => setNumStudents(e.target.valueAsNumber)} required/>
    <label className='text-xl font-bold mb-3'>Email Domain</label>
    <input className='border-b-2 border-rose-500' type="string" placeholder='knights.ucf.edu' name="emailDomain" value={emailDomain} onChange={(e) => setEamilDomain(e.target.value)} required/>
    <button 
      className='bg-rose-500 w-28 rounded-3xl p-2 text-white mt-5 text-lg shadow-lg mb-3 mr-5'
      type="submit"
      style={(disableButton) ? {opacity: .75} : undefined}
    >
      Create
    </button>
  </form>
  );
}

export default CreateUniversity;