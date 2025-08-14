import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Book } from "@/shared/model/types/books";

interface UseFavoriteBook {
    book: Book,
    favorites: Book[],
    setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,

}


export const useFavoriteBook = ({ book, favorites, setFavorites }: UseFavoriteBook) => {
    const { t } = useTranslation();

    const [isFavorite, setIsFavorite] = useState(
        favorites.some((el) => el.id === book.id)
    );

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const willBeFavorite = !isFavorite;

        if (willBeFavorite) {
            setFavorites((prev) => [...prev, book]);
            toast.success(t("toast.addedToFavorites"));
        } else {
            setFavorites((prev) => prev.filter((el) => el.id !== book.id));
            toast.warning(t("toast.removedFromFavorites"));
        }

        setIsFavorite(willBeFavorite);
    }, [book, isFavorite, setFavorites, t]);

    return {isFavorite, handleClick}
}
