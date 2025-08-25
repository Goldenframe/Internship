import { Book } from "@/shared/model/types/books";

import { STORAGE_KEY } from "./constants";

const isBook = (obj: unknown): obj is Book => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "kind" in obj &&
        "id" in obj &&
        "etag" in obj &&
        "selfLink" in obj &&
        "volumeInfo" in obj);
}


export const getFavorites = () => {
    try {
        const favoriteBooks = localStorage.getItem(STORAGE_KEY.FAVORITE_BOOKS);

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

export const addFavorites = (favorites: Book[]) => {
    try {
        localStorage.setItem(STORAGE_KEY.FAVORITE_BOOKS, JSON.stringify(favorites));
    }
    catch (err) {
        console.error('Error while saving favorites to localStorage:', err);
        return [];
    }
}
