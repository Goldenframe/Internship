import { useGate, useUnit } from "effector-react";

import { model } from "@/models/model";

export default function LogsPage() {
  const logs = useUnit(model.$logs);

  useGate(model.LogsGate);

  return (
    <div>
      <h1>Админка: последние GSSP-логи</h1>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Время</th>
            <th>URL</th>
            <th>Ref</th>
            <th>UA</th>
            <th>Lang</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.time}</td>
              <td>{log.resolvedUrl}</td>
              <td>{log.ref ?? '-'}</td>
              <td>{log.uaType}</td>
              <td>{log.lang}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
