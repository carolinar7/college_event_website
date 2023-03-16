import axios from "axios";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { url } from "~/helper";

const SignUp = () => {
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('')
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`${url}/user`, {
      email: email,
      password: password,
      fName: fName,
      lName: lName,
    }).then(async () => {
      await router.push('/auth/signin');
    }).catch(() => 
      setError('There was an issue during sign up')
    );
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-rose-500'>
      <div className="flex flex-col items-center justify-center bg-white h-3/5 w-96 rounded-xl shadow-lg">
        <Link  className='self-start justify-self-start mb-5 ml-14' href='/auth/signin'>
          <IoArrowBackOutline style={{color: "#F43F5E"}} size={25}/>
        </Link>
        <form className="flex flex-col" onSubmit={(e: FormEvent<HTMLFormElement>) => {onSubmit(e).catch(() => {return;})}}>
          <label className="text-rose-500 text-lg">
            First Name
          </label>
          <input className='border-b-2 border-rose-500' name="fName" type="text" onChange={(e) => setFName(e.target.value)} required/>
          <label className="text-rose-500 text-lg mt-5">
            Last Name
          </label>
          <input className='border-b-2 border-rose-500'name="lName" type="text" onChange={(e) => setLName(e.target.value)} required/>
          <label className="text-rose-500 text-lg mt-5">
            Email
          </label>
          <input className='border-b-2 border-rose-500' name="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
          <label className="text-rose-500 text-lg mt-5">
            Password
          </label>
          <input className='border-b-2 border-rose-500' name="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
          <div className='flex justify-center mt-5'>
            <button className='bg-rose-500 w-28 rounded-3xl p-2 text-white mt-5 text-lg shadow-lg mb-3' type="submit">Sign Up</button>
          </div>
        </form>
        <p className="h-5 mb-3">
          {error}
        </p>
      </div>
    </div>
  )
}

export default SignUp;