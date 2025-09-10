import { useEffect, useState } from 'react';

import { Spinner } from '@/components/spinner';
import { BASE_URL } from '@/config/env';
import BookList from '@/features/book-list';
import { fetchJSON } from '@/lib/api/fetch-json';
import { useFavorites } from '@/lib/hooks/use-favorite';
import { Book, SearchResponse } from '@/types/books';

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchJSON<SearchResponse>(
      `${BASE_URL}?q=javascript&startIndex=0&maxResults=20`,
      'Books were not found',
    )
      .then((data) => setBooks(data.items || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return <BookList books={books} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />;
}
