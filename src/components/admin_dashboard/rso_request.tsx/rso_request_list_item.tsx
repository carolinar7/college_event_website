import { IoCheckmark, IoClose, IoPeople, IoPerson } from "react-icons/io5";

interface RSOReqProp {
  item: {
    name: string,
    admin: string,
    supporting_students: string[],
    description: string,
  }
}

// TODO: fetch admins data to display contact info too

const RSORequestListItem = (props: RSOReqProp) => {
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
        <IoPerson className='mr-2' />
        {props.item.admin}
      </div>
      <div className='flex justify-start items-center'>
        <IoPeople className='mr-2' /> 
        {props.item.supporting_students.map((student, idx) => {
          if (idx === props.item.supporting_students.length - 1) {
            return student;
          }
          return `${student}, `;
        })}
      </div>
      <div>
        {props.item.description}
      </div>
    </div>
  )
};

export default RSORequestListItem;