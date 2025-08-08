import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchJSON } from "@/api/book-service";
import { BookItem } from "@/components/book-item";
import { BookList } from "@/components/book-list";
import type { Book, SearchResponse } from "@/types/books";

interface HomeProps {
  favorites: Book[];
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>;
}

export function Home({ favorites, setFavorites }: HomeProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("JavaScript");
  const [query, setQuery] = useState("JavaScript");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("");
  const maxResult = 20;

  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  const fetchData = useCallback(async (query: string, startIndex: number) => {
    setLoading(true);
    try {
      let url = `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResult}`
      if (filter) url += `&filter=${filter}`;

      const fetchPromise = fetchJSON<SearchResponse>(url, 'No books found');

      toast.promise(fetchPromise, {
        pending: "Loading...",
        success: {
          render({ data }) {
            if (!data.items) {
              return "No books found";
            }
            return data.items.length > 1
              ? `${data.items.length} books have been loaded`
              : `1 book has been loaded`;
          },
        },
        error: {
          render({ data }: { data: Error }) {
            return data?.message || "Failed to load books. Please try again";
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
  }, [BASE_URL, filter]);

  useEffect(() => {
    fetchData(query, startIndex);
  }, [fetchData, query, startIndex]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([]);
    setStartIndex(0);
    setHasMore(true);
    if (searchInput !== query) {
      setQuery(searchInput);
    } else {
      fetchData(query, 0);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBooks([]);
    setStartIndex(0);
    setHasMore(true);
    setFilter(e.target.value);
  };


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

        <button>Search</button>
      </form>
      <label htmlFor="book-filter" className="visually-hidden">
        <select
          id="book-filter"
          value={filter}
          onChange={handleSelect}
          title="Filter books by type"
        >
          <option value="">all</option>
          <option value="ebooks">ebooks</option>
          <option value="free-ebooks">free-ebooks</option>
          <option value="full">full</option>
          <option value="paid-ebooks">paid-ebooks</option>
          <option value="partial">partial</option>
        </select>
      </label>
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
        {books.length > 0
          ? books.map((book: Book) => (
            <BookItem
              key={book.id}
              book={book}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))
          : !loading && <div className="no-books-message">No books found</div>}

      </BookList>
    </div>
  );
}
