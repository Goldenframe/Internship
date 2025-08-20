import { createEffect } from "effector";
import { Book } from "../types/books";
import { addFavorites } from "@/shared/lib/utils/local-storage/favorites";

export const saveFavoritesFx = createEffect<Book[], void>((favorites) => {
    addFavorites(favorites);
});