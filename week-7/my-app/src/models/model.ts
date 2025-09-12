import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export interface LogGssp {
  time: string;
  resolvedUrl: string;
  ref?: string;
  uaType: string;
  lang: string;
  status: 'props' | 'redirect' | 'notFound';
}

const $logs = createStore<LogGssp[]>([]);

const fetchLogsFx = createEffect(async (): Promise<LogGssp[]> => {
  const res = await fetch('/api/logs');
  if (!res.ok) throw new Error(`Ошибка API: ${res.status}`);
  return res.json();
});

sample({
  clock: fetchLogsFx.doneData,
  target: $logs,
});

const LogsGate = createGate();

sample({
  clock: LogsGate.open,
  target: fetchLogsFx,
});

export const model = {
  $logs,
  LogsGate,
};
