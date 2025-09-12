import { model } from '@/server/logs-model';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = model.$logs.getState();
    console.log('📡 API /logs ответ:', data);
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { resolvedUrl, ref, uaType, lang, status } = req.body || {};
    if (!resolvedUrl || !uaType || !lang || !status) {
      return res.status(400).json({ error: 'Bad payload' });
    }
    model.addLog({ resolvedUrl, ref, uaType, lang, status });
    return res.status(201).json({ ok: true });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end('Method Not Allowed');
}
