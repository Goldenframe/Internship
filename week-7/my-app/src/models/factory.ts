import { createFactory } from '@withease/factories';
import { createEffect, createStore, sample } from 'effector';

import { BASE_URL } from '@/config/env';
import { fetchJSON } from '@/lib/api/fetch-json';
import { Book, SearchResponse } from '@/types/books';

interface Params {
  query: string;
  orderBy?: 'relevance' | 'newest';
  maxResults?: number;
}

export const createBookBlock = createFactory((params: Params) => {
  const loadFx = createEffect(async () => {
    const data = await fetchJSON<SearchResponse>(
      `${BASE_URL}?q=${params.query}&orderBy=${params.orderBy ?? 'relevance'}&startIndex=0&maxResults=${params.maxResults ?? 20}`,
      'Books were not found'
    );
    return data.items ?? [];
  });

  const $books = createStore<Book[]>([], { sid: `books-${params.query}` });

  sample({
    clock: loadFx.doneData,
    target: $books,
  });

  return { loadFx, $books };
});
