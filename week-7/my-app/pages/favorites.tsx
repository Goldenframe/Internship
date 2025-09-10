import BookList from '@/features/book-list';
import { useFavorites } from '@/lib/hooks/use-favorite';

export default function Page() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return <BookList books={favorites} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />;
}
