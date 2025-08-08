import { BookItem } from "@/components/book-item";
import { Book } from "@/types/books";



interface FavoritesProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>;
}


export function Favorites({ favorites, setFavorites }: FavoritesProps) {
  if (!favorites || favorites.length === 0) {
    return <p>No favorites yet</p>;
  }

  return (
    <div className="books-container">
      {favorites && Array.isArray(favorites) ? (
        favorites.map((book) => {
          return (
            <BookItem
              book={book}
              key={book.id}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
