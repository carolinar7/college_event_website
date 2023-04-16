import { RSOStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      const { userId, status } = req.query;
      if (status === 'pending') {
        const rsos = await prisma.rSO.findMany({
          where: {
            rsoStatus: RSOStatus.PENDING,
          },
          include: {
            User: true,
            RSOMembers: {
              include: {
                User: true,
              },
            },
          },
        });
        res.status(200).json(rsos);
      } else if (userId) {
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
      const { name, description, adminId, emailDomain, admin1, admin2, admin3, admin4 } = req.body;

      const university = await prisma.university.findFirst({
        where: {
          emailDomain: emailDomain,
        },
      });

      // find users whose email are admin1, admin2, admin3, admin4
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              id: adminId,
            },
            {
              email: admin1,
            },
            {
              email: admin2,
            },
            {
              email: admin3,
            },
            {
              email: admin4,
            },
          ],
        },
      });

      const rso = await prisma.rSO.create({
        data: {
          name,
          description,
          adminId,
          universityId: university?.id as string,
          RSOMembers: {
            create: users.map((user) => ({
              memberId: user.id,
            })),
          }  
        },
      }).catch((e) => {
        console.log(e);
        res.status(400).json({error: "The members provided are not registered"});
        return;
      });

      res.status(200).json(rso);
      break;
  }

const getRSOs = async (res: NextApiResponse) => {
  const rsos = await prisma.rSO.findMany({
    where: {
      rsoStatus: RSOStatus.APPROVED,
    },
  });
  res.status(200).json(rsos);
}