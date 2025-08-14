import { BookCard } from "@/entities/book-card/ui/book-card";
import { Book } from "@/shared/model/types/books";
import { BooksContainer } from "@/shared/ui/books-container/books-container";



interface FavoritesProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>;
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>;

}


export const Favorites = ({ favorites, setFavorites, setBookClicked }: FavoritesProps) => {
  if (!favorites || favorites.length === 0) {
    return <p>No favorites yet</p>;
  }

  return (
    <BooksContainer>
      {favorites && Array.isArray(favorites) ? (
        favorites.map((book) => {
          return (
            <BookCard
              book={book}
              key={book.id}
              setFavorites={setFavorites}
              favorites={favorites}
              setBookClicked={setBookClicked}
            />
          );
        })
      ) : (
        <></>
      )}
    </BooksContainer>
  );
}
