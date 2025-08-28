import { useGate, useList, useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import { model } from "@/entities/book-card/model/book-model";
import { BookCard } from "@/entities/book-card/ui/book-card";
import { Book } from "@/shared/model/types/books";
import { BooksContainer } from "@/shared/ui/templates";

export const SessionFavorites = () => {
  const sessionFavorites = useUnit(model.$sessionFavorites);

  const {t} = useTranslation();
  useGate(model.BooksGate, { t });

  const sessionFavoritesList = useList(model.$sessionFavorites, (book: Book) => (
    <BookCard
      key={book.id}
      book={book}
      isFavorite={true}
    />
  ));

  if (sessionFavorites.length === 0) {
    return <p>No session favorites yet</p>;
  }

  return <BooksContainer>{sessionFavoritesList}</BooksContainer>;
};
