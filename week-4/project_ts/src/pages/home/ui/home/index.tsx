import { useUnit } from 'effector-react';
import { useTranslation } from "react-i18next";

import { BookCard } from "@/entities/book-card/ui/book-card";
import { BookList } from "@/pages/home/ui/book-list";
import { SearchForm } from "@/pages/home/ui/book-search";
import { Book } from "@/shared/model/types/books";

import { useBookFilter } from "../../lib/use-book-filter";
import styles from './styles.module.scss'
import { useEffect } from 'react';
import { model } from "@/entities/book-card/model/book-model";

interface HomeProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
}

export const Home = ({
  favorites,
  setFavorites,
  setBookClicked,
}: HomeProps) => {
  const { t } = useTranslation();

  const [query, filter, books, loading, startIndex, fetchBooksFx] = useUnit([
    model.$query,
    model.$filter,
    model.$books,
    model.$loading,
    model.$startIndex,
    model.fetchBooksFx
  ]);

  const processedBooks = useBookFilter({ books, filter })

  useEffect(() => {
    fetchBooksFx({ query, startIndex, t });
  }, [query, startIndex]);



  return (
    <div>
      <SearchForm />
      <BookList     >
        {processedBooks.length > 0
          ? processedBooks.map((book: Book) => (
            <BookCard
              key={book.id}
              book={book}
              favorites={favorites}
              setFavorites={setFavorites}
              setBookClicked={setBookClicked}
            />
          ))
          : !loading && <div className={styles["no-books-message"]}>{t("toast.booksNotFound")}</div>}
      </BookList>
    </div>
  );
}