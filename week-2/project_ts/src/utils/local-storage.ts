import { Book } from "@/types/books";

enum StorageKey {
    FAVOURITE_BOOKS = 'favouriteBooks',
}

function isBook(obj: unknown): obj is Book {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "kind" in obj &&
        "id" in obj &&
        "etag" in obj &&
        "selfLink" in obj &&
        "volumeInfo" in obj &&
        "volumeInfo" in obj);
}


export function getFavourites() {
    try {
        const favouriteBooks = localStorage.getItem(StorageKey.FAVOURITE_BOOKS);

        if (!favouriteBooks) return []
        else {
            const parsedBooks = JSON.parse(favouriteBooks)
            return parsedBooks.filter((book: unknown): book is Book => isBook(book));
        }

    }
    catch (err) {
        console.log('Error while getting favourite books ', err);
        return [];
    }
}

export function addFavourites(favourites: Book[]) {
    try {
        localStorage.setItem(StorageKey.FAVOURITE_BOOKS, JSON.stringify(favourites));
    }
    catch (err) {
        console.error('Error while saving favourites to localStorage:', err);
        return [];
    }
}