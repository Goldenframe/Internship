import { createEvent, createStore, sample } from 'effector';

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

const $logs = createStore<LogGssp[]>([]);

const addLog = createEvent<LogGsspBase>();

sample({
  clock: addLog,
  source: $logs,
  fn: ($logs, log) => {
    const updated: LogGssp[] = [...$logs, { ...log, time: new Date().toISOString() }];
    if (updated.length > 10) updated.shift();

    console.log('GSSP Logs (LRU):');
    updated.forEach((entry, i) => {
      console.log(
        `${i + 1}. [${entry.time}] ${entry.status.toUpperCase()} ${entry.resolvedUrl} | ref=${entry.ref ?? '-'} | ua=${entry.uaType} | lang=${entry.lang}`,
      );
    });

    return updated;
  },
  target: $logs,
});

export const model = {
  $logs,
  addLog,
};
