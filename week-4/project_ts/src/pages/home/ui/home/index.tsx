import { useGate, useUnit } from 'effector-react';
import { useTranslation } from "react-i18next";

import { BookCard } from "@/entities/book-card/ui/book-card";
import { BookList } from "@/pages/home/ui/book-list";
import { SearchForm } from "@/pages/home/ui/book-search";
import { Book } from "@/shared/model/types/books";

import { useBookFilter } from "../../lib/use-book-filter";
import styles from './styles.module.scss'
import { model } from "@/entities/book-card/model/book-model";
import { HomeGate } from '@/entities/book-card/model/book-model/gates';
import { useEffect } from 'react';

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

  const [filter, books, loading, tStore, tUpdated] = useUnit([
    model.$filter,
    model.$books,
    model.$loading,
    model.$t, 
    model.tUpdated, 
  ]);

  useEffect(() => {
    tUpdated(t);
  }, [t, tUpdated]);

  const processedBooks = useBookFilter({ books, filter })
  
  useGate(HomeGate, {t});

  return (
    <div>
      <SearchForm />
      <BookList>
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
          : !loading && <div className={styles["no-books-message"]}>
              {t("toast.booksNotFound")} 
            </div>}
      </BookList>
    </div>
  );
}