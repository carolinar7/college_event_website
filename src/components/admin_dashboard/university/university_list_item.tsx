import Link from "next/link";
import { IoLocationSharp, IoMail, IoPeople } from "react-icons/io5";

export interface UniListProps {
  item: {
    id: string,
    name: string,
    location: string,
    description: string,
    numStudents: number,
    emailDomain: string
  }
}

const UniversityListItem = (props: UniListProps) => {
  return (
    <Link href={`/admin/admin_dashboard/university/${props.item.id}`}>
      <div className='p-5 border-b-2'>
        <div className='text-lg font-bold'>
          {props.item.name}
        </div>
        <div className='flex justify-start items-center'>
          <IoLocationSharp className='mr-2' />
          {props.item.location}
        </div>
        <div className='flex justify-start items-center'>
          <IoPeople className='mr-2' />
          {props.item.numStudents}
        </div>
        <div className='flex justify-start items-center'>
          <IoMail className='mr-2' />
          {props.item.emailDomain}
        </div>
        <div>
          {props.item.description}
        </div>
      </div>
    </Link>
  )
};

export default UniversityListItem;