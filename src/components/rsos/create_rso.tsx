import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RSO } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type FormEvent, useState, type SetStateAction, type Dispatch, useEffect } from "react";
import { env } from "~/env.mjs";
import { s3Client, url } from "~/helper";

const CreateRSO = (props: any) => {
  const { data } = useSession();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [admin1, setAdmin1] = useState<string>('');
  const [admin2, setAdmin2] = useState<string>('');
  const [admin3, setAdmin3] = useState<string>('');
  const [admin4, setAdmin4] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const checkEmailDomains = () => {
    const email1 = admin1.split('@')[1];
    const email2 = admin2.split('@')[1];
    const email3 = admin3.split('@')[1];
    const email4 = admin4.split('@')[1];
    const email = data?.user?.email as string;
    const userDomain = email.split('@')[1];
    return email1 === userDomain && email2 === userDomain && email3 === userDomain && email4 === userDomain;
  }

  const formatEventTitle = (name: string) => {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  const onCreateRSO = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    
    const formatedTitle = formatEventTitle(name);
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

    const adminId = data?.user?.id;
    const email = data?.user?.email as string;

    if (!checkEmailDomains()) {
      alert('Email domains must match for all members');
      return;
    };
    
    await axios.post(`${url}/rso`, {
      name,
      description,
      adminId,
      adminDomain: email.split('@')[1],
      admin1,
      admin2,
      admin3,
      admin4,
      image_url,
    }).then(({ data }: { data: RSO }) => {
      alert(`RSO ${data.name} was sent for approval!`);
      props.setShowPanel(false);
      setName('');
      setDescription('');
      setAdmin1('');
      setAdmin2('');
      setAdmin3('');
      setAdmin4('');
      setImage(null);
      setDisableButton(false);
    }).catch((e) => {
      alert(e.response.data.error);
    });
  }

  return (
    <form className='flex flex-col' onSubmit={(e) => {onCreateRSO(e).catch(() => {return})}}>
      <label className='text-xl font-bold mb-3'>RSO Name</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Member 1 Email</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="admin1" value={admin1} onChange={(e) => setAdmin1(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Member 2 Email</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="admin2" value={admin2} onChange={(e) => setAdmin2(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Member 3 Email</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="admin3" value={admin3} onChange={(e) => setAdmin3(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>Member 4 Email</label>
      <input className='border-b-2 border-rose-500 mb-3' type="text" name="admin4" value={admin4} onChange={(e) => setAdmin4(e.target.value)} required/>
      <label className='text-xl font-bold mb-3'>RSO Description</label>
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

export default CreateRSO;