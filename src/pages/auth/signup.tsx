import axios from "axios";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { url } from "~/helper";
import Button from "~/components/common/button";

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
    }).catch((e) => {
      setError(e.response.data.error)
    }
    );
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-rose-500'>
      <div className="flex flex-col items-center justify-center bg-white w-96 rounded-xl shadow-lg py-10">
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
            <Button className='mt-5' type='submit' value='Sign Up' />
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