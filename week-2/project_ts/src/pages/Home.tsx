import { useEffect, useState } from "react";
import BookItem from "../components/BookItem";
import { toast } from "react-toastify";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { fetchJSON } from "../api/bookService";
import type { Book, SearchResponse } from "../interfaces/books";

interface HomeProps {
  favourites: Book[];
  setFavourites: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function Home({ favourites, setFavourites }: HomeProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("JavaScript");
  const [query, setQuery] = useState("JavaScript");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const MAX_RESULT = import.meta.env.VITE_MAX_RESULT;


  const fetchData = async (query: string, startIndex: number) => {
    if (loading) return;
    setLoading(true);
    try {
      let url = `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${MAX_RESULT}`
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

      console.log(data);

      if (!data.items) {
        setBooks([]);
        setHasMore(false);
        return;
      }

      if (data.items.length < MAX_RESULT) setHasMore(false);

      const newBooks = data.items || [];
      setBooks(prev => startIndex === 0 ? newBooks : [...prev, ...newBooks]);
    } catch (err) {
      setBooks([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(query, startIndex);
  }, [query, startIndex, filter]);

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

  useInfiniteScroll(() => {
    if (hasMore && !loading) {
      setStartIndex((prev) => prev + MAX_RESULT);
    }
  }, hasMore, loading);

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
      <div className="books-container">
        {books.length > 0
          ? books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          ))
          : !loading && <div className="no-books-message">No books found</div>}
      </div>
    </div>
  );
}
