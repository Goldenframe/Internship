import { model as logsModel } from '@/server/logs-model';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(logsModel.$logs.getState());
}
