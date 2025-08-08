import { Book } from "@/types/books";

enum StorageKey {
    FAVORITE_BOOKS = 'favoriteBooks',
}

function isBook(obj: unknown): obj is Book {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "kind" in obj &&
        "id" in obj &&
        "etag" in obj &&
        "selfLink" in obj &&
        "volumeInfo" in obj);
}


export function getFavorites() {
    try {
        const favoriteBooks = localStorage.getItem(StorageKey.FAVORITE_BOOKS);

        if (!favoriteBooks) return []
        else {
            const parsedBooks: Book[] = JSON.parse(favoriteBooks)
            return parsedBooks.filter((book: unknown): book is Book => isBook(book));
        }

    }
    catch (err: unknown) {
        console.log('Error while getting favorite books ', err);
        return [];
    }
}

export function addFavorites(favorites: Book[]) {
    try {
        localStorage.setItem(StorageKey.FAVORITE_BOOKS, JSON.stringify(favorites));
    }
    catch (err) {
        console.error('Error while saving favorites to localStorage:', err);
        return [];
    }
}
