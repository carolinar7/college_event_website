import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query?.eventId as string;
  const commentId = req.query?.commentId as string;

  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      where: { eventId },
      include: {
        User: true,
      },
    });
    res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const { comment, rating, userId, eventId } = req.body;
    const com = await prisma.comment.create({
      data: {
        comment,
        rating,
        userId,
        eventId,
      }, 
      include: {
        User: true,
      },
    });
    res.status(200).json(com);
  } else if (req.method === "PUT") {
    const { comment, rating, userId, eventId } = req.body;
    const com = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        comment,
        rating,
        userId,
        eventId,
      },
    });
    res.status(200).json(com);
  } else if (req.method === "DELETE") {
    const commment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(200).json(commment);
  }
}
