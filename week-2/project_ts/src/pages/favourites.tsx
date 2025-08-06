import { Book } from "@/types/books";

import BookItem from "../components/book-item";

interface FavouritesProps {
  favourites: Book[],
  setFavourites: React.Dispatch<React.SetStateAction<Book[]>>;
}


export default function Favourites({ favourites, setFavourites }: FavouritesProps) {
  if (!favourites || favourites.length === 0) {
    return <p>No favourites yet</p>;
  }

  return (
    <div className="books-container">
      {favourites && Array.isArray(favourites) ? (
        favourites.map((book) => {
          return (
            <BookItem
              book={book}
              key={book.id}
              setFavourites={setFavourites}
              favourites={favourites}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
