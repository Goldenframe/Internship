import { Book } from "@/types/books";
import { Language, Theme } from "@/types/contexts";

const STORAGE_KEY = {
    FAVORITE_BOOKS: 'favoriteBooks',
    THEME: 'theme',
    LANG: 'lang'
} as const;

const isTheme = (str: string): str is Theme => {
    return (
        typeof str === "string" &&
        (str === 'light' || str === 'dark')
    );
}

export const getTheme = (): Theme => {
    const theme = localStorage.getItem(STORAGE_KEY.THEME);

    if (theme && isTheme(theme)) {
        return theme
    }
    return "light"
}

export const changeTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY.THEME, theme);
}

const isLang = (str: string): str is Language => {
    return (
        typeof str === "string" &&
        (str === 'ru' || str === 'en')
    );
}

export const changeLang = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY.LANG, lang);
}

export const getLang = (): Language => {
    const lang = localStorage.getItem(STORAGE_KEY.LANG);

    if (lang && isLang(lang)) {
        return lang
    }
    return "en"
}

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
