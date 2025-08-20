import { Book } from "@/shared/model/types/books";
import { createStore, Scope } from "effector";

export const $bookDetails = createStore<Book | null>(null);
export const $isLoading = createStore<boolean>(true);
export const $scope = createStore<Scope | null>(null);