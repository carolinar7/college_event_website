import { EventStatus, EventType, Prisma, User } from '@prisma/client';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { prisma } from '~/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { userId, status } = req.query;
    
    if (status === "pending") {
      const events = await prisma.event.findMany({
        where: {
          eventType: EventType.PUBLIC,
          eventStatus: EventStatus.PENDING,
        },
        include: {
          User: true,
        },
        distinct: ['id'],
      });
      res.status(200).json(events);
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    // return events if they are public, private and the user has the same email domain for a university, and if it as an rso event that they are a part of
    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            eventType: EventType.PUBLIC,
            eventStatus: EventStatus.APPROVED,
          },
          {
            eventType: EventType.PRIVATE,
            AND: [
              {
                University: {
                  emailDomain: getEmailDomain(user?.email as string),
                }
              },
            ]
          },
          {
            eventType: EventType.RSO,
            AND: [
              {
                RSO: {
                  RSOMembers: {
                    some: {
                      memberId: userId as string,
                    },                      
                  },
                }
              },
            ]
          },
        ],
      },
      distinct: ['id'],
    });

    res.status(200).json(events);
  } else if (req.method === "POST") {
    const body = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: body.userId as string,
      },
    });

    const university = await prisma.university.findUnique({
      where: {
        emailDomain: getEmailDomain(user?.email as string),
      },
    });

    const location_url = await getCoordinatesURL(body.location);
    let postData: (Prisma.Without<Prisma.EventCreateInput, Prisma.EventUncheckedCreateInput> & Prisma.EventUncheckedCreateInput) | (Prisma.Without<Prisma.EventUncheckedCreateInput, Prisma.EventCreateInput> & Prisma.EventCreateInput) = {
      title: body.title,
      description: body.description,
      starts: convertDate(body.starts),
      ends: convertDate(body.ends),
      tags: body.tags,
      image_url: body.image_url,
      eventType: body.eventType.toUpperCase(),
      eventStatus: (body.eventType === "public") ? EventStatus.PENDING : EventStatus.APPROVED,
      location: body.location,
      location_url: location_url,
      User: {
        connect: {
          id: body.userId,
        },
      },
      University: {
        connect: {
          id: university?.id,
        },
      },
    }

    if (body?.rsoId) {
      postData.RSO = {
        connect: {
          id: body?.rsoId,
        },
      }
    }

    const event = await prisma.event.create({
      data: postData
    });
    res.json(event);
  }
}

const getCoordinatesURL = async (location: string) => {
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${env.GOOGLE_MAPS_API_KEY}`;
  return axios.get(geocodingApiUrl)
    .then(response => {
      const locationData = response.data.results[0].geometry.location;
      const latitude = locationData.lat;
      const longitude = locationData.lng;

      // Generate a URL for Google Maps using the coordinates
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      return mapsUrl;
    })
    .catch(error => {
      console.log(error);
      return ''
    });
};

function convertDate(date: string) {
  const d = new Date(date);
  return d.toUTCString();
}

const getEmailDomain = (email: string) => {
  const emailDomain = email.split('@')[1];
  return emailDomain;
};