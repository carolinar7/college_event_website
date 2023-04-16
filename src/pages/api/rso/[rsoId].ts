import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rsoId } = req.query;
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      const { userId } = req.query;
      
      if (userId) {
        const rso = await prisma.rSOMembers.findFirst({
          where: {
            memberId: userId as string,
            rsoID: rsoId as string,
          }
        })

        if (rso) {
          res.status(200).json(true);
        } else {
          res.status(200).json(false);
        }
        return;
      }

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
    case 'POST':
      const { memberId } = req.body;

      const rsoMember = await prisma.rSOMembers.findFirst({
        where: {
          memberId: memberId,
          rsoID: rsoId as string,
        }
      });

      if (rsoMember) {
        await prisma.rSOMembers.deleteMany({
          where: {
            memberId: memberId,
            rsoID: rsoId as string,
          }
        });

        res.status(200).json({});
        
        return;
      }

      await prisma.rSOMembers.create({
        data: {
          memberId: memberId,
          rsoID: rsoId as string,
        }
      });

      res.status(200).json({});

      break;
  }
}