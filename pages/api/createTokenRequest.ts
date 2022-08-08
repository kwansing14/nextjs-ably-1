// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Ably from 'ably/promises';
import { v4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY ?? '');
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: v4(),
    });
    res.status(200).json(tokenRequestData);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
