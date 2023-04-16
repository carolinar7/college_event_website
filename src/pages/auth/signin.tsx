import { signIn } from "next-auth/react"
import Link from "next/link";
import router from "next/router";
import { type FormEvent, useState } from "react";
import { IoArrowBackOutline } from 'react-icons/io5'
import Button from "~/components/common/button";

const SignIn = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    
    const signedIn = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    })

    if (signedIn?.ok) {
      await router.push('/views/event');
    } else {
      setError('Could not login with credentials');
      setDisableButton(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-rose-500">
      <div className='flex flex-col items-center justify-center bg-white w-96 rounded-xl shadow-lg py-10'>
        <Link  className='self-start justify-self-start mb-5 ml-14' href='/'>
          <IoArrowBackOutline style={{color: "#F43F5E"}} size={25}/>
        </Link>
        <form className='flex flex-col' onSubmit={(e: FormEvent<HTMLFormElement>) => {onSubmit(e).catch(() => {return;})}}>
          <label className="text-rose-500 text-lg">
            Email
          </label>
          <input className='border-b-2 border-rose-500' name="username" type="text" onChange={(e) => setUsername(e.target.value)} required />
          <label className='text-rose-500 text-lg mt-5'>
            Password
          </label>
          <input className='border-b-2 border-rose-500 mb-5' name="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
          <div className="flex flex-1 flex-row justify-center">
            <Button className='mt-5 mb-3' type='submit' disabled={disableButton} style={(disableButton) ? {opacity: .75} : undefined} value='Sign In' />
          </div>
        </form>
        <p className="h-5 mb-3">
          {error}
        </p>
        <div className="flex justify-center">
          <Link className='text-sm text-rose-600' href='/auth/signup'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn;