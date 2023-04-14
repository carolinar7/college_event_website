import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "~/server/db"

// create a handler and handle a Get request that returns the event with the given id in prisma and nextjs typescript
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;

  const event = await prisma.event.findUnique({
    where: {
      id: eventId as string,
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: event?.hostId as string,
    }
  })

  res.status(200).json({...event, ...user})
}
