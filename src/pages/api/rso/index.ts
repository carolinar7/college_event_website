import { RSOStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  if(requestMethod === 'GET') {
    const { userId, adminId, status } = req.query;
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
          University: true,
        },
      });
      res.status(200).json(rsos);
    } else if (adminId) {
      const rsos = await prisma.rSO.findMany({
        where: {
          adminId: userId as string,
        },
      });
      res.status(200).json(rsos);
    }
    else
    {
      getRSOs(res, userId as string).catch((e) => console.log(e));
    }
  } else if (requestMethod === 'POST') {
    const { name, description, adminId, emailDomain, admin1, admin2, admin3, admin4, admin5, image_url } = req.body;

    const university = await prisma.university.findFirst({
      where: {
        emailDomain: emailDomain,
      },
    });

    console.log(emailDomain, university)

    // find users whose email are admin1, admin2, admin3, admin4
    const users = await prisma.user.findMany({
      where: {
        OR: [
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
          {
            email: admin5,
          },
        ],
      },
    });

    const rso = await prisma.rSO.create({
      data: {
        name,
        description,
        adminId,
        image_url,
        universityId: university?.id as string,
        RSOMembers: {
          create: users.map((user) => ({
            memberId: user.id,
          })),
        }  
      },
    }).catch((e) => {
      res.status(400).json({error: "The members provided are not registered"});
      return;
    });

    res.status(200).json(rso);
  }
}

const getEmailDomain = (email: string) => {
  const emailDomain = email.split('@')[1];
  return emailDomain;
}

const getRSOs = async (res: NextApiResponse, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // get university of user based of email domain of user
  const university = await prisma.university.findFirst({
    where: {
      emailDomain: getEmailDomain(user?.email as string),
    },
  });

  const rsos = await prisma.rSO.findMany({
    where: {
      rsoStatus: RSOStatus.APPROVED,
      universityId: university?.id as string,
    },
  });
  
  res.status(200).json(rsos);
}