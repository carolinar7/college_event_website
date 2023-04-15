import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rsoId } = req.query;
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      //getRSO(universityId, res).catch((e) => console.log(e));
      const rso = await prisma.rSO.findUnique({
        where: {
            id: rsoId as string,
        },
        include:{
            User: true
            
        }
      })
      res.status(200).json(rso);
      break;
    // case 'POST':
    //   const body = req.body as PostUniversity;
    //   updateUniversity(universityId, body, res).catch((e) => console.log(e));
    //   return;
  }
}