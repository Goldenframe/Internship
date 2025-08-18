import { Book } from "@/shared/model/types/books";
import { createStore } from "effector";

export const $books = createStore<Book[]>([]);
export const $loading = createStore<boolean>(false);
export const $searchInput = createStore<string>("JavaScript");
export const $query = createStore<string>("JavaScript");
export const $startIndex = createStore<number>(0);
export const $hasMore = createStore<boolean>(true);
export const $filter = createStore<string>("");

