import { createFactory } from '@withease/factories';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { toast } from 'react-toastify';

import { BASE_URL } from '@/shared/config/env';
import { Book } from '@/shared/model/types/books';

interface FetchBookDetailsParams {
  bookId: string;
  t: (key: string) => string;
}

export const createBookModel = createFactory(() => {
  const $bookDetails = createStore<Book | null>(null);
  const $isLoading = createStore<boolean>(false);
  const $isOpen = createStore<boolean>(false);
  const $t = createStore<(key: string) => string>((key) => key);

  const bookDetailsOpened = createEvent<string>();
  const bookDetailsClosed = createEvent();
  const tUpdated = createEvent<(key: string) => string>();

  const fetchBookDetailsFx = createEffect<FetchBookDetailsParams, Book>(
    async ({ bookId, t }) => {
      const url = `${BASE_URL}${bookId}`;

      try {
        const fetchPromise = fetch(url).then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        });

        toast.promise(fetchPromise, {
          pending: t('toast.pendingBookDetails'),
          success: t('toast.successBookDetals'),
          error: {
            render({ data }: { data: Error }): string {
              return data?.message || t('toast.errorBookDetails');
            },
          },
        });

        const data = await fetchPromise;
        return data;
      } catch (error) {
        toast.error(t('toast.errorBookDetails'));
        throw error;
      }
    }
  );

  sample({
    clock: bookDetailsOpened,
    fn: () => true,
    target: $isOpen
  });

  sample({
    clock: bookDetailsOpened,
    source: $t,
    fn: (t, bookId) => ({ bookId, t }),
    target: fetchBookDetailsFx
  });

  sample({
    clock: bookDetailsClosed,
    fn: () => false,
    target: $isOpen
  });

  sample({
    clock: bookDetailsClosed,
    fn: () => null,
    target: $bookDetails
  });

  sample({
    clock: bookDetailsClosed,
    fn: () => false,
    target: $isLoading
  });

  sample({
    clock: fetchBookDetailsFx.doneData,
    target: $bookDetails
  });

  sample({
    clock: fetchBookDetailsFx.pending,
    target: $isLoading
  });

  sample({
    clock: tUpdated,
    target: $t
  });
  return {
    $bookDetails,
    $isLoading,
    $isOpen,
    $t,

    bookDetailsOpened,
    bookDetailsClosed,
    tUpdated,
  };
});