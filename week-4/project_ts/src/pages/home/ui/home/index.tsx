import { useGate, useList, useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { model } from "@/entities/book-card/model/book-model";
import { BookCard } from "@/entities/book-card/ui/book-card";
import { BookList } from "@/pages/home/ui/book-list";
import { SearchForm } from "@/pages/home/ui/book-search";
import { Book } from "@/shared/model/types/books";

import styles from './styles.module.scss'

interface HomeProps {
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
}

export const Home = ({
  setBookClicked,
}: HomeProps) => {
  const { t } = useTranslation();

  const [processedBooksArr, tUpdated] = useUnit([
    model.$processedBooks,
    model.tUpdated,
  ]);

  useEffect(() => {
    tUpdated(t);
  }, [t, tUpdated]);

  useGate(model.BooksGate, { t });

  const bookList = useList(model.$processedBooks, (book: Book) => (
    <BookCard
      key={book.id}
      book={book}
      setBookClicked={setBookClicked}
    />
  ));

  const isEmpty = processedBooksArr.length === 0;

  return (
    <div>
      <SearchForm />
      <BookList>
        {isEmpty ? (
          <div className={styles["no-books-message"]}>
            {t("toast.booksNotFound")}
          </div>
        ) : (
          bookList
        )}
      </BookList>
    </div>
  );
}