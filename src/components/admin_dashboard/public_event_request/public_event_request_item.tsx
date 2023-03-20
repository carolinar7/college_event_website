import { IoCalendarClear, IoCall, IoCheckmark, IoClose, IoMail, IoPerson, IoPricetag, IoTime } from "react-icons/io5";

interface PublicEventReqProp {
  item: {
    name: string,
    type: string,
    time: string,
    date: string,
    admin: string,
    phone: string,
    email: string,
    description: string,
  }
}

const PublicEventRequestListItem = (props: PublicEventReqProp) => {
  return (
    <div className='p-5 border-b-2'>
      <div className='flex justify-between'>
        <div className='text-lg font-bold'>{props.item.name}</div>
        <div>
          <button className='p-2 mr-3 rounded-full bg-rose-500 shadow-sm shadow-gray-500'>
            <IoCheckmark color='white'/>
          </button>
          <button className='p-2 rounded-full bg-red-500 shadow-sm shadow-gray-500'>
            <IoClose color='white'/>
          </button>
        </div>
      </div>
      <div className='flex justify-start items-center'>
        <IoPricetag className='mr-2' />
        {props.item.type}
      </div>
      <div className='flex'>
        <div className='flex justify-start items-center mr-5'>
          <IoCalendarClear className='mr-2' />
          {props.item.date}
        </div>
        <div className='flex justify-start items-center'>
          <IoTime className='mr-2' />
          {props.item.time}
        </div>
      </div>
      <div className='flex'>
        <div className='flex justify-start items-center mr-5'>
          <IoPerson className='mr-2' />
          {props.item.admin}
        </div>
        <div className='flex justify-start items-center mr-5'>
          <IoCall className='mr-2' />
          {props.item.email}
        </div>
        <div className='flex justify-start items-center'>
          <IoMail className='mr-2' />
          {props.item.phone}
        </div>
      </div>
      <div>
        {props.item.description}
      </div>
    </div>
  )
};

export default PublicEventRequestListItem;