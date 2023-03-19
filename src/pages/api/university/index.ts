import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      getUniversities(res).catch((e) => console.log(e));
      break;
    case 'POST':
      const body = req.body as PostUniversity;
      createUniversity(body, res).catch((e) => console.log(e));
  }
}

const getUniversities = async (res: NextApiResponse) => {
  const universities = await prisma.university.findMany();
  res.status(200).json(universities);
}

export type PostUniversity = {
  name: string,
  location: string,
  description: string,
  numStudents: number,
  emailDomain: string
};

const createUniversity = async (body: PostUniversity, res: NextApiResponse) => {
  try {
    const university = await prisma.university.create({
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        numStudents: body.numStudents,
        emailDomain: body.emailDomain
      }
    });
    res.status(200).json(university);
  } catch (e) {
    res.status(400).json({});
  }
}