import { Book } from "@/shared/model/types/books";
import { createStore, Scope } from "effector";

export const $bookDetails = createStore<Book | null>(null);
export const $isLoading = createStore<boolean>(true);
export const $isFavorite = createStore<boolean>(false);
export const $scope = createStore<Scope | null>(null);
export const $favorites = createStore<Book[]>([]); 