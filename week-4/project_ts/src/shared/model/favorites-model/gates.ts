import { createGate } from "effector-react";

import { Book } from "../types/books";

export const FavoritesGate = createGate<Book[]>();