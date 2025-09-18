import { invoke } from '@withease/factories';
import { useUnit } from 'effector-react';

import BookList from '@/features/book-list';
import { useFavorites } from '@/lib/hooks/use-favorite';
import { createBookBlock } from '@/models/factory';

export const popularBooks = invoke(createBookBlock, { query: 'popular', orderBy: 'relevance' });

export function PopularBooksSection() {
  const books = useUnit(popularBooks.$books);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section>
      <h2>Популярное</h2>
      <BookList books={books} toggleFavorite={toggleFavorite} isFavorite={isFavorite} prefix='popular'/>
    </section>
  );
}
