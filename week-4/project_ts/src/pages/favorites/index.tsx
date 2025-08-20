import { BookCard } from "@/entities/book-card/ui/book-card";
import { model } from "@/shared/model/favorites-model";
import { Book } from "@/shared/model/types/books";
import { BooksContainer } from "@/shared/ui/templates/books-container";
import { useList, useUnit } from "effector-react";

interface FavoritesProps {
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>;
}

export const Favorites = ({ setBookClicked }: FavoritesProps) => {
  const favorites = useUnit(model.$favorites);

  const favoritesList = useList(model.$favorites, (book: Book) => (
    <BookCard
      key={book.id}
      book={book}
      setBookClicked={setBookClicked}
    />
  ));

  if (favorites.length === 0) {
    return <p>No favorites yet</p>;
  }

  return <BooksContainer>{favoritesList}</BooksContainer>;
};
