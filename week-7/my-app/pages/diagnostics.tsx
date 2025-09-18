import { useEffect, useState } from 'react';

import { Spinner } from '@/components/spinner';

type HeadersMap = Record<string, string | string[] | undefined>;

export default function DiagnosticsPage() {
  const [headers, setHeaders] = useState<HeadersMap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const res = await fetch('/api/echo-headers');
        const data = await res.json();
        setHeaders(data);
      } catch (e) {
        console.error('Ошибка загрузки заголовков:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaders();
  }, []);

  return (
    <div>
      <h1>Диагностика</h1>
      {loading ? (
        <Spinner />
      ) : headers ? (
        <pre>{JSON.stringify(headers, null, 2)}</pre>
      ) : (
        <p>Не удалось загрузить заголовки</p>
      )}
    </div>
  );
}
