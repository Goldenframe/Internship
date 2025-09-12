import { createEffect } from 'effector';

type Status = 'props' | 'redirect' | 'notFound';

export interface LogPayload {
  resolvedUrl: string;
  ref?: string;
  uaType: string;
  lang: string;
  status: Status;
}

export const logGsspFx = createEffect<{ origin: string } & LogPayload, void>(
  async ({ origin, ...payload }) => {
    try {
      const res = await fetch(`${origin}/api/logs`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error('logGsspFx: failed', res.status);
      }
    } catch (e) {
      console.error('logGsspFx: error', e);
    }
  },
);
