import { useList, useUnit } from 'effector-react';
import { useTranslation } from "react-i18next";

import { model } from "@/entities/book-card/model/book-model";
import { BookCard } from "@/entities/book-card/ui/book-card";
import { BookList } from "@/pages/home/ui/book-list";
import { SearchForm } from "@/pages/home/ui/book-search";
import { Book } from "@/shared/model/types/books";
import { Spinner } from '@/shared/ui/atoms';

import styles from './styles.module.scss'


export const Home = () => {
  const { t } = useTranslation();

  const [processedBooksArr, status, hasMore, startIndex] = useUnit([
    model.$processedBooks, model.$status, model.$hasMore, model.$startIndex
  ]);

  const bookList = useList(model.$processedBooks, (book: Book & { isFavorite: boolean }) => (
    <BookCard
      key={book.id}
      book={book}
      isFavorite={book.isFavorite}
    />
  ));

  const isEmpty = processedBooksArr.length === 0;
  const isInitialLoading = status === "pending" && startIndex === 0;
  const isLoadMore = status === "pending" && hasMore;

  return (
    <div>
      <SearchForm />
      <BookList>
        {isInitialLoading ? (
            <Spinner />
        ) : isEmpty ? (
          <div className={styles["no-books-message"]}>
            {t("toast.booksNotFound")}
          </div>
        ) : (
          <>
            {bookList}
            {isLoadMore && (
              <div className={styles["bottom-spinner"]}>
                <Spinner />
              </div>
            )}
          </>
        )}
      </BookList>
    </div>
  );
}
