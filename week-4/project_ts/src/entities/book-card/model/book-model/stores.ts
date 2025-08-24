import { combine, createStore } from "effector";

import { Book, FILTER_TYPES } from "@/shared/model/types/books";
export const $favorites = createStore<Book[]>([])
export const $books = createStore<Book[]>([]);
export const $loading = createStore<boolean>(false);
export const $searchInput = createStore<string>("JavaScript");
export const $query = createStore<string>("JavaScript");
export const $startIndex = createStore<number>(0);
export const $hasMore = createStore<boolean>(true);
export const $filter = createStore<string>("");
export const $t = createStore<(key: string) => string>(() => "");
export const $openedBookId = createStore<string | null>(null)

export const $isModalOpen = $openedBookId.map((id) => id !== null);

export const $processedBooks = combine({ books: $books, filter: $filter, favorites: $favorites }, ({ books, filter, favorites }) => {
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

    return result.map(book => ({
        ...book,
        isFavorite: favorites.some(f => f.id === book.id),
    }));
})

