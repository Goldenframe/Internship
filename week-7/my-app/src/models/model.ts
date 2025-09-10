import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const $logs = createStore<LogGssp[]>([]);

export interface LogGsspBase {
  resolvedUrl: string;
  ref?: string;
  uaType: string;
  lang: string;
  status: 'props' | 'redirect' | 'notFound';
}

export interface LogGssp extends LogGsspBase {
  time: string;
}

const addLog = createEvent<LogGsspBase>();

sample({
  clock: addLog,
  source: $logs,
  fn: ($logs, log) => {
    const updated: LogGssp[] = [...$logs, { ...log, time: new Date().toISOString() }];
    if (updated.length > 10) updated.shift();
    return updated;
  },
  target: $logs,
});

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
  addLog,
  LogsGate,
};
