import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { fetchJSON } from "@/api/book-service";
import { BookCard } from "@/components/book-card";
import { BookList } from "@/components/book-list";
import { FILTER_TYPES, type Book, type SearchResponse } from "@/types/books";

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
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("JavaScript");
  const [query, setQuery] = useState("JavaScript");
  const maxResult = 20;

  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  const fetchData = useCallback(async (query: string, startIndex: number) => {
    setLoading(true);
    try {
      let url = `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResult}`

      const fetchPromise = fetchJSON<SearchResponse>(url, 'No books found');

      toast.promise(fetchPromise, {
        pending: t("toast.pendingBooks"),
        success: {
          render({ data }) {
            if (!data.items) {
              return t("toast.noBooksFound");
            }
            return data.items.length > 1
              ? t("toast.successManyBooks", { count: data.items.length })
              : t("toast.successOneBooks");
          },
        },
        error: {
          render({ data }: { data: Error }) {
            return data?.message || t("toast.errorBook");
          },
        },
      });

      const data = await fetchPromise;

      const newBooks = data.items || [];

      if (newBooks.length === 0 && startIndex !== 0) {
        setHasMore(false);
        return;
      }

      if (newBooks.length < maxResult) setHasMore(false);

      setBooks((prev) =>
        startIndex === 0 ? newBooks : [...prev, ...newBooks]
      );
    } catch (err) {
      setBooks([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, t, setHasMore]);

  useEffect(() => {
    fetchData(query, startIndex);
  }, [fetchData, query, startIndex]);

  const processedBooks = useMemo(() => {
    let result = [...books];

    if (filter) {
      result = result.filter(book => {
        if (filter === FILTER_TYPES.EBOOKS) {
          return book.accessInfo?.epub?.isAvailable || book.accessInfo?.pdf?.isAvailable;
        }
        if (filter === FILTER_TYPES.FREE_EBOOKS) {
          return book.saleInfo?.saleability === "FREE";
        }
        if (filter === FILTER_TYPES.PAID_EBOOKS) {
          return book.saleInfo?.saleability === "FOR_SALE";
        }
        if (filter === FILTER_TYPES.FULL) {
          return book.accessInfo?.viewability === "ALL_PAGES";
        }
        if (filter === FILTER_TYPES.PARTIAL) {
          return book.accessInfo?.viewability === "PARTIAL";
        }
        return true;
      });
    }
    return result;
  }, [books, filter]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setBooks([]);
    setStartIndex(0);
    setHasMore(true);
    if (searchInput !== query) {
      setQuery(searchInput);
    } else {
      fetchData(query, 0);
    }
  }, [searchInput, query, fetchData, setHasMore, setStartIndex]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input" className="visually-hidden">
          <input
            id="search-input"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for books..."
          />
        </label>

        <button type="submit">{t("common.search")}</button>
      </form>
      <BookList
        loading={loading}
        hasMore={hasMore}
        onLoadMore={(currentStartIndex: number) => {
          if (hasMore && !loading) {
            setStartIndex(currentStartIndex + maxResult);
          }
        }}
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
          : !loading && <div className="no-books-message">{t("toast.booksNotFound")}</div>}

      </BookList>
    </div>
  );
}
