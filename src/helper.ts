import { S3 } from "@aws-sdk/client-s3";

export const url = (process.env.NODE_ENV === 'production') ? 'https://college-event-website.vercel.app/api' : 'http://localhost:3000/api';

export const s3Client = new S3({
  forcePathStyle: false,
  endpoint: process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DO_SPACES_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACES_SECRET as string
  }
});