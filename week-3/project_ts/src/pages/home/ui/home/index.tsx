import { useTranslation } from "react-i18next";

import { BookCard } from "@/entities/book-card/ui/book-card";
import { BookList } from "@/pages/home/ui/book-list";
import { SearchForm } from "@/pages/home/ui/book-search";
import { type Book } from "@/shared/model/types/books";

import { useBookFilter } from "../../lib/use-book-filter";
import { useBookSearch } from "../../lib/use-book-search";

import styles from './styles.module.scss'

interface HomeProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
  filter: string,
  startIndex: number,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>,
  hasMore: boolean,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Home = ({
  favorites,
  setFavorites,
  setBookClicked,
  filter,
  startIndex,
  setStartIndex,
  hasMore,
  setHasMore
}: HomeProps) => {

  const { t } = useTranslation();
  const { books, loading, searchInput, setSearchInput, handleSubmit, onLoadMore } = useBookSearch({ startIndex, setStartIndex, hasMore, setHasMore });

  const processedBooks = useBookFilter({books, filter})

  return (
    <div>
      <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleSubmit={handleSubmit} />
      <BookList
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        startIndex={startIndex}
      >
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
