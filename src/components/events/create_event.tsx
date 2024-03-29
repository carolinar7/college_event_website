import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RSO, type Event } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type FormEvent, useState, type SetStateAction, type Dispatch, useEffect } from "react";
import { env } from "~/env.mjs";
import { s3Client, url } from "~/helper";

interface CreateEventsProps {
  setShowPanel: Dispatch<SetStateAction<boolean>>,
}

const CreateEvent = ({ setShowPanel }: CreateEventsProps) => {
  const { data } = useSession();
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [starts, setStarts] = useState<string>('');
  const [ends, setEnds] = useState<string>('');
  const [tags, setTag] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [eventType, setEventType] = useState<string>('public');
  const [RSOs, setRSOs] = useState<Array<RSO>>([]);
  const [rsoId, setRSOId] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.user) return;
    const userId = data?.user?.id;
    axios.get(`${url}/rso?adminId=${userId}`).then(({ data }: { data: Array<RSO> }) => {
      setRSOs(data);
      if (data && data.length !== 0) {
        const first = data[0] as RSO;
        setRSOId(first.id);
      }
    })
  }, [data]);

  const formatEventTitle = (title: string) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }
  
  const onCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);

    const formatedTitle = formatEventTitle(title);
    const image_name = `${formatedTitle}${image.name}`;

    await s3Client.send(new PutObjectCommand(
      {
        Bucket: env.NEXT_PUBLIC_DO_SPACES_NAME,
        ACL: "public-read",
        Key: image_name,
        Body: image,
      }
    ));

    const image_url = `https://${env.NEXT_PUBLIC_DO_SPACES_NAME}.nyc3.digitaloceanspaces.com/${image_name}`;

    const userId = data?.user?.id;
    await axios.post(`${url}/event`, {
      title,
      location,
      starts,
      ends,
      description,
      eventType,
      userId,
      tags,
      image_url,
      rsoId: eventType === 'rso' ? rsoId : undefined,
    }).then(({ data }: { data: Event }) => {
      if (eventType === 'public') {
        alert(`Event ${data.title} was sent for approval!`);
      } else {
        alert(`Event ${data.title} was created!`);
      }
    });

    setShowPanel(false);

    setTitle('');
    setLocation('');
    setStarts('');
    setEnds('');
    setDescription('');
    setEventType('');
    setRSOId('');
    setTag('');
    setDisableButton(false);
  }

  return (
    <form className='flex flex-col' onSubmit={(e) => {onCreateEvent(e).catch(() => {return})}}>
      <label className='text-xl font-bold mb-3'>Event Title</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Event Type</label>
      <select className='border-b-2 border-rose-500 mb-3' name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="rso">RSO</option>
      </select>
      {
        eventType === 'rso' && (
          // make it a searchable dropdown
          <div className="flex flex-col">
            <label className='text-xl font-bold mb-3'>Your RSOs</label>
            <select className='border-b-2 border-rose-500 mb-3' name="rso" value={rsoId} onChange={(e) => setRSOId(e.target.value)} required>
              {RSOs.map((rso) => {
                return (
                  <option key={rso.id} value={rso.id}>{rso.name}</option>
                )
              })}
            </select>
          </div>
        )
      }
      <label className='text-xl font-bold mb-3'>Location</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Starts</label>
      <input className='border-b-2 border-rose-500 mb-3' type="datetime-local" name="starts" value={starts} onChange={(e) => setStarts(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Ends</label>
      <input className='border-b-2 border-rose-500 mb-3' type="datetime-local" name="ends" value={ends} onChange={(e) => setEnds(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Categories</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="tag" value={tags} onChange={(e) => setTag(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Description</label>
      <textarea rows={3} className='border-b-2 border-rose-500 mb-3' name="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>      
      <label className='text-xl font-bold mb-3'>Upload Image</label>
      <input className='mb-3 cursor-pointer' type="file" name="image" required
        onChange={(e) => {
          if (!e?.target?.files) return;
          setImage(e?.target?.files[0])
        }}
      />
      <button 
        className='bg-rose-500 w-28 rounded-3xl p-2 text-white mt-5 text-lg shadow-lg mb-3 mr-5'
        type="submit"
        style={(disableButton) ? {opacity: .75} : undefined}
        disabled={disableButton}
      >
        Create
      </button>
    </form>
  );
}

export default CreateEvent;