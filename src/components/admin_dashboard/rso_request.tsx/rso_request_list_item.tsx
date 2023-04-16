import { RSOStatus } from "@prisma/client";
import axios from "axios";
import { IoCheckmark, IoClose, IoMail, IoPeople, IoPerson } from "react-icons/io5";
import { url } from "~/helper";

const RSORequestListItem = (props: any) => {
  const approveRSO = () => {
    axios.put(`${url}/rso/${props.item.id}`, { rsoStatus: RSOStatus.APPROVED }).then(() => {
      props.setRSOs(props.rsos.filter((rso: any) => rso.id !== props.item.id));
    }).catch(() => {return;});
  }

  const denyRSO = () => {
    axios.delete(`${url}/rso/${props.item.id}`).then(() => {
      props.setRSOs(props.rsos.filter((rso: any) => rso.id !== props.item.id));
    }).catch(() => {return;});
  }

  return (
    <div className='p-5 border-b-2'>
      <div className='flex justify-between'>
        <div className='text-lg font-bold'>{props.item.name}</div>
        <div>
          <button className='p-2 mr-3 rounded-full bg-rose-500 shadow-sm shadow-gray-500' onClick={() => approveRSO()}>
            <IoCheckmark color='white'/>
          </button>
          <button className='p-2 rounded-full bg-red-500 shadow-sm shadow-gray-500' onClick={() => denyRSO()}>
            <IoClose color='white'/>
          </button>
        </div>
      </div>
      <div className='flex justify-start items-center'>
        <IoPerson className='mr-2' />
        {props.item.User.fName + ' ' + props.item.User.lName}
      </div>
      <div className='flex justify-start items-center'>
        <IoMail className='mr-2' />
        {props.item.User.email}
      </div>
      <div className='flex justify-start items-center'>
        <IoPeople className='mr-2' /> 
        {props.item.RSOMembers.map((student: any, idx: number) => {
          if (student.id === props.item.User.id) return;
          if (idx === props.item.RSOMembers.length - 1) {
            return `${student.User.email}`;
          }
          return `${student.User.email}, `;
        })}
      </div>
      <div>
        {props.item.description}
      </div>
    </div>
  )
};

export default RSORequestListItem;