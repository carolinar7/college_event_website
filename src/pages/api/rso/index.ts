// Create a handler for GET requests to /api/rso that takes a query parameter of rsoId and returns the RSOs with that ID.

import { EventStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
}