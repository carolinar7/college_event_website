import { EventStatus } from "@prisma/client";
import axios from "axios";
import { IoCalendarClear, IoCall, IoCheckmark, IoClose, IoMail, IoPerson, IoPricetag, IoTime } from "react-icons/io5";
import { url } from "~/helper";

const getTimeStrings = (starts: string) => {
  // Convert input string to Date object
  const date = new Date(starts);

  // Get hours and minutes in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Format time string
  const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

  // Format date string
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const dateString = `${monthNames[monthIndex]} ${day}, ${year}`;

  return { timeString, dateString };
}

const PublicEventRequestListItem = (props: any) => {
  const { timeString, dateString } = getTimeStrings(props.item.starts);

  const approveEvent = () => {
    axios.put(`${url}/event/${props.item.id}`, { eventStatus: EventStatus.APPROVED }).then(() => {
      props.setEvents(props.events.filter((event: any) => event.id !== props.item.id));
    }).catch(() => {return;});
  }

  const denyEvent = () => {
    axios.delete(`${url}/event/${props.item.id}`).then(() => {
      props.setEvents(props.events.filter((event: any) => event.id !== props.item.id));
    }).catch(() => {return;});
  }

  return (
    <div className='p-5 border-b-2'>
      <div className='flex justify-between'>
        <div className='text-lg font-bold'>{props.item.title}</div>
        <div>
          <button className='p-2 mr-3 rounded-full bg-rose-500 shadow-sm shadow-gray-500' onClick={() => approveEvent()}>
            <IoCheckmark color='white'/>
          </button>
          <button className='p-2 rounded-full bg-red-500 shadow-sm shadow-gray-500' onClick={() => denyEvent()}>
            <IoClose color='white'/>
          </button>
        </div>
      </div>
      <div className='flex justify-start items-center'>
        <IoPricetag className='mr-2' />
        {props.item.tags}
      </div>
      <div className='flex'>
        <div className='flex justify-start items-center mr-5'>
          <IoCalendarClear className='mr-2' />
          {dateString}
        </div>
        <div className='flex justify-start items-center'>
          <IoTime className='mr-2' />
          {timeString}
        </div>
      </div>
      <div className='flex'>
        <div className='flex justify-start items-center mr-5'>
          <IoPerson className='mr-2' />
          {props.item.User.fName + " " + props.item.User.lName}
        </div>
        <div className='flex justify-start items-center'>
          <IoMail className='mr-2' />
          {props.item.User.email}
        </div>
      </div>
      <div>
        {props.item.description}
      </div>
    </div>
  )
};

export default PublicEventRequestListItem;