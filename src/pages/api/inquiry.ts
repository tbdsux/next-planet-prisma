import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await createInquiry(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed', success: false });
}

async function createInquiry(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, subject, message } = req.body;

  try {
    const newEntry = await prisma.inquiry.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    return res.status(200).json({ data: newEntry, success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error creating inquiry', success: false });
  }
}
