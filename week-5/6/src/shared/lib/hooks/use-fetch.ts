import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface FetchParams {
  bookId: string;
  t: (key: string) => string;
  signal: AbortSignal | null;
}

export const useFetch = <T>(bookId: string | null, effect: (params: FetchParams) => Promise<T>) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!bookId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    effect({ bookId, t, signal });

    return () => { controller.abort() }

  }, [bookId, effect, t])
};
