import { createFactory } from '@withease/factories';
import { createEffect, createStore, sample, combine } from 'effector';
import { status } from 'patronum/status';
import { toast } from 'react-toastify';

import { BASE_URL } from '@/shared/config/env';
import { Book } from '@/shared/model/types/books';

import { modalOpened, modalClosed } from './events';
import { $favorites } from './stores';

interface FetchBookDetailsParams {
  bookId: string;
  t: (key: string) => string;
  signal?: AbortSignal | null;
}

export const createBookModel = createFactory(() => {
  const $bookDetails = createStore<Book | null>(null);
  const $errorKey = createStore<string | null>(null);

  const fetchBookDetailsFx = createEffect<FetchBookDetailsParams, Book>(
    async ({ bookId, t, signal }) => {
      await new Promise(resolve => setTimeout(resolve, 5000));

      const url = `${BASE_URL}${bookId}`;

      try {
        const fetchPromise = fetch(url, { signal: signal ?? null }).then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        });

        const data = await fetchPromise;
        return data;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Запрос отменён');
          throw error;
        }

        toast.error(t('toast.errorBookDetails'));
        throw error;
      }
    }
  );


  const $status = status(fetchBookDetailsFx);

  sample({
    clock: modalOpened,
    fn: ({ bookId, t }) => ({ bookId, t }),
    target: fetchBookDetailsFx,
  });
  sample({
    clock: fetchBookDetailsFx.doneData,
    target: $bookDetails,
  });

  sample({
    clock: fetchBookDetailsFx.fail,
    fn: () => null,
    target: $bookDetails
  });

  sample({
    clock: modalClosed,
    fn: () => null,
    target: $bookDetails,
  });

  const $bookDetailsWithFavorite = combine(
    $bookDetails,
    $favorites,
    (book, favorites) => {
      if (!book) return null;
      return {
        ...book,
        isFavorite: favorites.some(f => f.id === book.id),
      };
    }
  );

  return {
    $bookDetailsWithFavorite,
    $status,
    $errorKey,
    fetchBookDetailsFx
  };
});
