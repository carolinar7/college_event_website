import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "~/server/db"

// create a handler and handle a Get request that returns the event with the given id in prisma and nextjs typescript
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // handle get request
  const { eventId } = req.query;
  if (req.method === "GET") {
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
  } else if (req.method === "PUT") {
    const { eventStatus } = req.body;
    const event = await prisma.event.update({
      where: {
        id: eventId as string,
      },
      data: {
        eventStatus: eventStatus,
      }
    })
    res.status(200).json(event)
  } else if (req.method === "DELETE") {
    const event = await prisma.event.delete({
      where: {
        id: eventId as string,
      }
    })
    res.status(200).json(event)
  }
}
