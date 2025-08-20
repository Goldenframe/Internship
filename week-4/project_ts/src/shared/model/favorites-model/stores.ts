import { createStore } from "effector";

import { Book } from "../types/books";

export const $favorites = createStore<Book[]>([])