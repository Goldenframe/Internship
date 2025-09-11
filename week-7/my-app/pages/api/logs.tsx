
import { model } from '@/server/logs-model';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = model.$logs.getState();
  console.log('📡 API /logs ответ:', data);
  res.status(200).json(data);
}