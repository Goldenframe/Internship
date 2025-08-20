import { createEffect } from "effector";

import { addFavorites } from "@/shared/lib/utils/local-storage/favorites";

import { Book } from "../types/books";

export const saveFavoritesFx = createEffect<Book[], void>((favorites) => {
    addFavorites(favorites);
});