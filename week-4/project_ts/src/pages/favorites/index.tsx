import { useGate, useList, useUnit } from "effector-react";

import { model } from "@/entities/book-card/model/book-model";
import { BookCard } from "@/entities/book-card/ui/book-card";
import { Book } from "@/shared/model/types/books";
import { BooksContainer } from "@/shared/ui/templates/books-container";

interface FavoritesProps {
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>;
}

export const Favorites = ({ setBookClicked }: FavoritesProps) => {
  const favorites = useUnit(model.$favorites);
  useGate(model.BooksGate);

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
