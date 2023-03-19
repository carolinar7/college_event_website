import Link from "next/link";
import { type ReactNode } from "react";

interface SidePanelProps {
  children: ReactNode
}

const SidePanel = ({ children }: SidePanelProps) => {
  return (
    <div className='flex flex-1'>
      <div className='flex flex-col border-r-2 w-64'>
        <ul>
          <Link href={'/admin/admin_dashboard/university'}>
            <li className='p-5 border-b-2 hover:bg-rose-400 hover:text-white'>
              Universities
            </li>
          </Link>
          <Link href={'/admin/admin_dashboard/rso_request'}>
            <li className='p-5 border-b-2 hover:bg-rose-400 hover:text-white'>
              RSO Requests
            </li>
          </Link>
          <Link href={'/admin/admin_dashboard/public_event_request'}>
            <li className='p-5 border-b-2 hover:bg-rose-400 hover:text-white'>
              Public Event Requests
            </li>
          </Link>
        </ul>
      </div>
      <div className='flex flex-col w-full mx-5'>
        {children}
      </div>
    </div>
  )
}

export default SidePanel;