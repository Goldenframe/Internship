import { useState, useEffect } from "react";
import { Book } from "@/types/books";
import { addFavorites, getFavorites } from "@/lib/utils/local-storage/favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<Book[]>([]);

    useEffect(() => {
        setFavorites(getFavorites(localStorage));
    }, []);

    const toggleFavorite = (book: Book) => {
        const isFavorite = favorites.some(fav => fav.id === book.id);
        let updated: Book[];

        if (isFavorite) {
            updated = favorites.filter(fav => fav.id !== book.id);
        } else {
            updated = [...favorites, book];
        }

        addFavorites(localStorage, updated);
        setFavorites(updated);
    };

    const isFavorite = (bookId: string) =>
        favorites.some(fav => fav.id === bookId);

    return { favorites, toggleFavorite, isFavorite };
}