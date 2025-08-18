import { sample } from "effector";
import { fetchBooksFx } from "./effects";
import { filterUpdated, hasMoreUpdated, loadedMore, resetPagination, searchFormSubmitted, searchInputUpdated, startIndexUpdated } from "./events";
import { $books, $filter, $hasMore, $loading, $query, $searchInput, $startIndex } from './stores';
import { MAX_RESULT } from "./config";


export const model = {
    searchFormSubmitted,
    loadedMore,
    startIndexUpdated,
    hasMoreUpdated,
    filterUpdated,
    searchInputUpdated,
    resetPagination,
    $books,
    $loading,
    $searchInput,
    $query,
    $startIndex,
    $hasMore,
    $filter,
    fetchBooksFx
};

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
    clock: fetchBooksFx.doneData,
    fn: (books) => { console.log('books update ', books) }
})

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
  clock: $startIndex,
  fn: (startIndex) => {
    console.log('startIndex update', startIndex);
    return startIndex; 
  },
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
  clock: $hasMore,
  fn: (hasMore) => {
    console.log('hasMore update', hasMore);
    return hasMore; 
  },
  target: $hasMore, 
});

sample({
    clock: filterUpdated,
    target: $filter,
})

sample({
  clock: $filter,
  fn: (filter) => {
    console.log('filter update', filter);
    return filter; 
  },
  target: $filter, 
});


sample({
    clock: searchInputUpdated,
    target: $searchInput,
})
