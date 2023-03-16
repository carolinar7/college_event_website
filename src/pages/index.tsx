import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import Logo from "~/assets/Logo";

const Home: NextPage = () => {
  const { status } = useSession();
  
  const redirectToEvents = async () => {
    await router.push('/views/events');
  };

  const onClick = () => {
    if (status === 'authenticated') {
      redirectToEvents().catch(() => {return;});
    } else {
      signIn().catch(() => console.log('Error: failed login'));
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-rose-500'>
      <Logo width={200} height={207}/>
      <p className="text-8xl mt-10 mb-6 font-semibold text-rose-500 text-center">
          College Events
      </p>
      <button className='bg-rose-500 w-28 rounded-3xl p-2 text-white mt-5 text-lg shadow-lg' onClick={onClick}>
        Start
      </button>
    </div>
  );
};

export default Home;
