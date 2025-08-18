import { sample } from "effector";
import { LoadedMore, resetPagination, SearchFormSubmitted } from "./events";
import { $books, $hasMore, $loading, $query, $searchInput, $startIndex } from "./stores";
import { fetchBooksFx } from "./effects";

const maxResult = 20;

sample({
    clock: SearchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => {
        return searchInput !== query;
    },
    fn: ({ searchInput }) => searchInput,
    target: $query
});

sample({
    clock: SearchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => {
        return searchInput === query;
    },
    target: resetPagination,
});

sample({
    clock: LoadedMore,
    source: { hasMore: $hasMore, loading: $loading },
    filter: ({ hasMore, loading }) => {
        return hasMore && !loading;
    },
    fn: (_, startIndex) => startIndex + maxResult,
    target: $startIndex,
});

sample({
    clock: fetchBooksFx.doneData,
    source: { books: $books, startIndex: $startIndex },
    fn: ({ books, startIndex }, newBooks) => {
        return startIndex === 0 ? newBooks : [...books, ...newBooks];
    },
    target: $books,
});

sample({
    clock: fetchBooksFx.doneData,
    source: $startIndex,
    fn: (startIndex, newBooks) => {
        if (newBooks.length === 0 && startIndex !== 0) {
            return false;
        }
        return newBooks.length === maxResult;
    },
    target: $hasMore,
});

sample({
    clock: fetchBooksFx.pending,
    fn: (pending) => pending,
    target: $loading,
});