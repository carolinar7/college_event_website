import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db' 

// TODO: add jwt verification

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      const query = req.query as GetUser;
      getUser(query, res).catch((e) => console.log(e));
      break;
    case 'POST':
      const body = req.body as PostUser;
      createUser(body, res).catch((e) => console.log(e));
  }
}

export type GetUser = {
  username: string
}

const getUser = async (query: GetUser, res: NextApiResponse) => {
  const user = await prisma.user.findUnique({
    where: {
      email: query.username,
    }
  });
  if (!user) {
    res.status(200).json({});
    return;
  }
  res.status(200).json(user);
}

export type PostUser = {
  email: string,
  password: string,
  fName: string,
  lName: string,
}

const createUser = async (body: PostUser, res: NextApiResponse) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        fName: body.fName,
        lName: body.lName,
        permission: 'student'
      }
    });
    console.log('succ')
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({});
  }
}