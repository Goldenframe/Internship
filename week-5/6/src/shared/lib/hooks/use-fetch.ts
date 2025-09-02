import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface FetchBookDetailsParams {
  bookId: string;
  t: (key: string) => string;
  signal: AbortSignal;
}

export const useFetch = <T>(bookId: string | null, effect: (params: FetchBookDetailsParams) => Promise<T>) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!bookId) return;

    const controller = new AbortController();

    effect({ bookId, t, signal: controller.signal });

    return () => { controller.abort() }

  }, [bookId, effect, t])
};
