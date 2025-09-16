import { invoke } from '@withease/factories';
import { useUnit } from 'effector-react';

import BookList from '@/features/book-list';
import { useFavorites } from '@/lib/hooks/use-favorite';
import { createBookBlock } from '@/models/factory';

export const jsBooks = invoke(createBookBlock,  { query: 'javascript', orderBy: 'relevance' });

export function JsBooksSection() {
  const books = useUnit(jsBooks.$books);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section>
      <h2>JS-книги</h2>
      <BookList books={books} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
    </section>
  );
}
