import { combine, sample } from "effector";
import { debounce } from 'patronum/debounce';
import { debug } from 'patronum/debug';
import { reset } from 'patronum/reset';
import { spread } from 'patronum/spread';
import { status } from 'patronum/status';
import { toast } from "react-toastify";

import { getFavorites } from "@/shared/lib/utils/local-storage/favorites";
import { Book } from "@/shared/model/types/books";

import { MAX_RESULT } from "./config";
import { fetchBooksFx, loadModalWithDelayFx, saveFavoritesFx, saveSessionFavoritesFx } from "./effects";
import { filterUpdated, hasMoreUpdated, loadedMore, resetPagination, searchFormSubmitted, searchInputUpdated, startIndexUpdated, queryUpdated, favoriteToggled, modalOpened, modalClosed, clearSearch, bookViewed, sessionFavoriteToggled } from "./events";
import { createBookModel } from "./factories";
import { AppGate } from "./gates";
import { $books, $favorites, $sessionFavorites, $filter, $hasMore, $isModalOpen, $openedBookId, $processedBooks, $query, $searchInput, $startIndex, $t, $viewedBooks } from './stores';

debug({ $books });

const $status = status({ effect: fetchBooksFx });

sample({
    clock: favoriteToggled,
    source: { favorites: $favorites, t: $t },
    fn: ({ favorites, t }, book: Book) => {
        const isFavorite = favorites.some(f => f.id === book.id);

        if (isFavorite) {
            toast.warning(t("toast.removedFromFavorites"));
            return favorites.filter(f => f.id !== book.id);
        } else {
            toast.success(t("toast.addedToFavorites"));
            return [...favorites, book];
        }
    },
    target: $favorites,
});

sample({
    clock: sessionFavoriteToggled,
    source: { sessionFavorites: $sessionFavorites,favorites: $favorites },
    fn: ({ sessionFavorites, favorites }, book: Book) => {
        const isFavorite = sessionFavorites.some(f => f.id === book.id) && favorites.some(f => f.id === book.id);

        if (isFavorite) {
            return sessionFavorites.filter(f => f.id !== book.id);
        } else {
            return [...sessionFavorites, book];
        }
    },
    target: $sessionFavorites,
});


sample({
    clock: searchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => searchInput !== query,
    fn: ({ searchInput }) => searchInput,
    target: $query
});

sample({
    clock: searchFormSubmitted,
    source: { searchInput: $searchInput, query: $query },
    filter: ({ searchInput, query }) => searchInput === query,
    target: resetPagination,
});



sample({
    clock: loadedMore,
    source: { hasMore: $hasMore, status: $status, startIndex: $startIndex },
    filter: ({ hasMore, status }) => hasMore && status !== 'pending',
    fn: ({ startIndex }) => startIndex + MAX_RESULT,
    target: $startIndex,
});

sample({
    clock: fetchBooksFx.doneData,
    source: { books: $books, startIndex: $startIndex },
    fn: ({ books, startIndex }, newBooks) => ({
        books: startIndex === 0 ? newBooks : [...books, ...newBooks],
        hasMore: newBooks.length === MAX_RESULT || (startIndex === 0 && newBooks.length > 0),
    }),
    target: spread({
        books: $books,
        hasMore: $hasMore,
    }),
});


sample({ clock: startIndexUpdated, target: $startIndex });


sample({ clock: hasMoreUpdated, target: $hasMore });

sample({
    clock: resetPagination,
    fn: () => ({ startIndex: 0, hasMore: false }),
    target: spread({
        startIndex: $startIndex,
        hasMore: $hasMore,
    }),
});

sample({ clock: filterUpdated, target: $filter });


sample({ clock: searchInputUpdated, target: $searchInput });

sample({
    clock: AppGate.open,
    source: { query: $query, startIndex: $startIndex },
    filter: ({ query }) => query.length > 0,
    fn: ({ query, startIndex }, { t }) => ({ query, startIndex, t }),
    target: fetchBooksFx,
});
const $fetchParams = combine(
    $query,
    $startIndex,
    (query, startIndex) => ({ query, startIndex })
);

const debouncedFetchParams = debounce({
    source: $fetchParams,
    timeout: 300,
});

sample({
    clock: debouncedFetchParams,
    source: { query: $query, startIndex: $startIndex, t: $t },
    fn: ({ query, startIndex, t }) => ({ query, startIndex, t }),
    target: fetchBooksFx,
});

sample({
    clock: AppGate.open,
    fn: () => getFavorites(localStorage),
    target: $favorites,
});

sample({
    clock: AppGate.open,
    fn: () => getFavorites(sessionStorage),
    target: $sessionFavorites,
});

sample({
    clock: AppGate.open,
    fn: ({ t }) => t,
    target: $t,
});

sample({
    clock: favoriteToggled,
    source: $favorites,
    target: saveFavoritesFx
});

sample({
    clock: sessionFavoriteToggled,
    source: $sessionFavorites,
    target: saveSessionFavoritesFx
});

sample({
    clock: modalOpened,
    fn: (params) => params,
    target: spread({
        bookId: $openedBookId,
        t: $t,
    }),
});

sample({
    clock: modalClosed,
    fn: () => null,
    target: $openedBookId,
});

reset({
    clock: clearSearch,
    target: [$searchInput, $query]
});

sample({
    clock: clearSearch,
    target: resetPagination,
});

sample({
    clock: bookViewed,
    source: $viewedBooks,
    filter: (viewedBooks, bookId) => !viewedBooks.includes(bookId),
    fn: (viewed, bookId) => [...viewed, bookId],
    target: $viewedBooks,
})


export const model = {
    createBookModel,
    AppGate,
    searchFormSubmitted,
    loadedMore,
    startIndexUpdated,
    hasMoreUpdated,
    filterUpdated,
    searchInputUpdated,
    resetPagination,
    queryUpdated,
    favoriteToggled,
    sessionFavoriteToggled,
    modalClosed,
    modalOpened,
    clearSearch,
    bookViewed,
    $books,
    $favorites,
    $sessionFavorites,
    $status,
    $searchInput,
    $query,
    $startIndex,
    $hasMore,
    $filter,
    $t,
    $processedBooks,
    $isModalOpen,
    $viewedBooks,
    $openedBookId,
    loadModalWithDelayFx
};