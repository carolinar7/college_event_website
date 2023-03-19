import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { universityId } = req.query;
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      getUniversity(universityId, res).catch((e) => console.log(e));
      break;
    case 'POST':
      const body = req.body as PostUniversity;
      updateUniversity(universityId, body, res).catch((e) => console.log(e));
      return;
    case 'DELETE':
      deleteUniversity(universityId, res).catch((e) => console.log(e));
  }
}


const getUniversity = async (universityId: (string | string[] | undefined), res: NextApiResponse) => {
  const university = await prisma.university.findUnique({
    where: {
      id: universityId as string,
    }
  });
  res.status(200).json(university);
}

export type PostUniversity = {
  name: string,
  location: string,
  description: string,
  numStudents: number,
  emailDomain: string
};

const updateUniversity = async (universityId: (string | string[] | undefined), body: PostUniversity, res: NextApiResponse) => {
  try {
    const university = await prisma.university.update({
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        numStudents: body.numStudents,
        emailDomain: body.emailDomain
      },
      where: {
        id: universityId as string
      }
    });
    res.status(200).json(university);
  } catch (e) {
    res.status(400).json({});
  }
}

const deleteUniversity = async (universityId: (string | string[] | undefined), res: NextApiResponse) => {
  try {
    const university = await prisma.university.delete({
      where: {
        id: universityId as string,
      }
    });
    res.status(200).json(university);
  } catch (e) {
    res.status(400).json({});
  }
}