import { merge, sample } from "effector";
import { debug } from 'patronum/debug';
import { fetchBooksFx } from "./effects";
import { filterUpdated, hasMoreUpdated, loadedMore, resetPagination, searchFormSubmitted, searchInputUpdated, startIndexUpdated, queryUpdated, tUpdated } from "./events";
import { $books, $filter, $hasMore, $loading, $processedBooks, $query, $searchInput, $startIndex, $t } from './stores';
import { MAX_RESULT } from "./config";
import { HomeGate } from "./gates";


export const model = {
    HomeGate,
    searchFormSubmitted,
    loadedMore,
    startIndexUpdated,
    hasMoreUpdated,
    filterUpdated,
    searchInputUpdated,
    resetPagination,
    queryUpdated,
    tUpdated,
    $books,
    $loading,
    $searchInput,
    $query,
    $startIndex,
    $hasMore,
    $filter,
    $t,
    $processedBooks,
    fetchBooksFx
};

debug({ $books });

sample({
    clock: searchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => {
        return searchInput !== query;
    },
    fn: ({ searchInput }) => searchInput,
    target: $query
});

sample({
    clock: searchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => {
        return searchInput === query;
    },
    target: resetPagination,
});

sample({
    clock: loadedMore,
    source: { hasMore: $hasMore, loading: $loading },
    filter: ({ hasMore, loading }) => {
        return hasMore && !loading;
    },
    fn: (_, startIndex) => startIndex + MAX_RESULT,
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
        return newBooks.length === MAX_RESULT;
    },
    target: $hasMore,
});

sample({
    clock: fetchBooksFx.pending,
    fn: (pending) => pending,
    target: $loading,
});

sample({
    clock: startIndexUpdated,
    target: $startIndex,
})

sample({
    clock: resetPagination,
    fn: () => 0,
    target: $startIndex,
});

sample({
    clock: hasMoreUpdated,
    target: $hasMore,
})

sample({
    clock: resetPagination,
    fn: () => false,
    target: $hasMore,
});

sample({
    clock: filterUpdated,
    target: $filter,
})

sample({
    clock: searchInputUpdated,
    target: $searchInput,
})

sample({
    clock: tUpdated,
    target: $t,
})

sample({
    clock: HomeGate.open,
    source: { query: $query, startIndex: $startIndex },
    filter: ({ query }) => query.length > 0,
    fn: ({ query, startIndex }, { t }) => ({ query, startIndex, t }),
    target: fetchBooksFx,
});

sample({
    clock: merge([$startIndex, $query]),
    source: { query: $query, startIndex: $startIndex, t: $t },
    fn: ({ query, startIndex, t }) => ({
        query,
        startIndex,
        t
    }),
    target: fetchBooksFx,
});