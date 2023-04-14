// Create a handler for GET requests to /api/rso that takes a query parameter of rsoId and returns the RSOs with that ID.

//import { EventStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

/*export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (userId) {
      const rsos = await prisma.rSO.findMany({
        where: {
          adminId: userId as string,
        },
      });
      res.status(200).json(rsos);
    }
  }
}*/

//import type { NextApiRequest, NextApiResponse } from 'next';
//import { prisma } from '../../../server/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      const { userId } = req.query;
      if (userId) {
        const rsos = await prisma.rSO.findMany({
          where: {
            adminId: userId as string,
          },
        });
        res.status(200).json(rsos);
      }
      else
      {
        getRSOs(res).catch((e) => console.log(e));
      }
      break;
    case 'POST':
      const body = req.body as PostUniversity;
      createUniversity(body, res).catch((e) => console.log(e));
  }
}

const getRSOs = async (res: NextApiResponse) => {
  const rsos = await prisma.rSO.findMany();
  res.status(200).json(rsos);
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