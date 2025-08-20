import { createStore, Scope } from "effector";

import { Book } from "@/shared/model/types/books";

export const $bookDetails = createStore<Book | null>(null);
export const $isLoading = createStore<boolean>(true);
export const $scope = createStore<Scope | null>(null);