import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

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
      const { name, description, adminId, emailDomain, admin1, admin2, admin3, admin4 } = req.body;

      const university = await prisma.university.findFirst({
        where: {
          emailDomain: emailDomain,
        },
      });

      const rso = await prisma.rSO.create({
        data: {
          name,
          description,
          adminId,
          universityId: university?.id as string,
        },
      });

      await prisma.rSOMembers.createMany({
        data: [
          {
            memberId: adminId,
            rsoID: rso.id,
          },
          {
            memberId: admin1,
            rsoID: rso.id,
          },
          {
            memberId: admin2,
            rsoID: rso.id,
          },
          {
            memberId: admin3,
            rsoID: rso.id,
          },
          {
            memberId: admin4,
            rsoID: rso.id,
          },
        ],
      });

      res.status(200).json({});
      break;
  }
}

const getRSOs = async (res: NextApiResponse) => {
  const rsos = await prisma.rSO.findMany();
  res.status(200).json(rsos);
}