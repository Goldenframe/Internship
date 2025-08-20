import { createEvent } from "effector";
import { Book } from "../types/books";

export const favoriteToggled = createEvent<Book>();
export const favoritesLoaded = createEvent<Book[]>();
export const favoritesSaved = createEvent<Book[]>();