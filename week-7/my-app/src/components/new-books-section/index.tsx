import { invoke } from '@withease/factories';
import { useUnit } from 'effector-react';

import BookList from '@/features/book-list';
import { useFavorites } from '@/lib/hooks/use-favorite';
import { createBookBlock } from '@/models/factory';

export const newBooks = invoke(createBookBlock, { query: 'new', orderBy: 'newest' });

export function NewBooksSection() {
  const books = useUnit(newBooks.$books);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section>
      <h2>Новинки</h2>
      <BookList books={books} toggleFavorite={toggleFavorite} isFavorite={isFavorite} prefix='new'/>
    </section>
  );
}
