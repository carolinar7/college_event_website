import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const {data: session} = useSession();

  return (
    <div className='h-16 bg-rose-500'>
      <ul className='flex h-full items-center justify-end text-white p-5'>
        {
          (session?.user.role === Role.SUPERADMIN) ? (
            <li className='mx-5'>
              <Link href='/admin/admin_dashboard/university'>Admin Dashboard</Link>
            </li>
          ) : null
        }
        <li className='mx-5'>
          <Link href='/views/event'>Events</Link>
        </li>
        <li className='mx-5'>
          <Link href='/views/rso'>RSOs</Link>
        </li>
        <li className='mx-5'>
          <button onClick={() => {signOut().catch(() => {return;})}}>Log Out</button>
        </li>
      </ul>
    </div>
  )
}

export default Nav;