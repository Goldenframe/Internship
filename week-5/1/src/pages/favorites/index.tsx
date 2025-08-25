import { useGate, useList, useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import { model } from "@/entities/book-card/model/book-model";
import { BookCard } from "@/entities/book-card/ui/book-card";
import { Book } from "@/shared/model/types/books";
import { BooksContainer } from "@/shared/ui/templates";

export const Favorites = () => {
  const favorites = useUnit(model.$favorites);

  const {t} = useTranslation();
  useGate(model.BooksGate, { t });

  const favoritesList = useList(model.$favorites, (book: Book) => (
    <BookCard
      key={book.id}
      book={book}
      isFavorite={true}
    />
  ));

  if (favorites.length === 0) {
    return <p>No favorites yet</p>;
  }

  return <BooksContainer>{favoritesList}</BooksContainer>;
};
