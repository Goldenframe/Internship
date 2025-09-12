import { createStore, createEvent, sample } from 'effector';

export interface LogGsspBase {
  resolvedUrl: string;
  ref?: string;
  uaType: string;
  lang: string;
  status: string;
}

export interface LogGssp extends LogGsspBase {
  time: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;

const $logs =
  (g.__GSSP_LOGS__ as ReturnType<typeof createStore<LogGssp[]>>) ?? createStore<LogGssp[]>([]);
const addLog =
  (g.__GSSP_ADD_LOG__ as ReturnType<typeof createEvent<LogGsspBase>>) ?? createEvent<LogGsspBase>();

if (!g.__GSSP_LOGS__) {
  g.__GSSP_LOGS__ = $logs;
  g.__GSSP_ADD_LOG__ = addLog;

  sample({
    clock: addLog,
    source: $logs,
    fn: (prev, log) => {
      const updated: LogGssp[] = [...prev, { ...log, time: new Date().toISOString() }];
      if (updated.length > 10) {
        updated.shift();
      }

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
}

export const model = {
  $logs,
  addLog,
};
