import { createGate } from "effector-react";

export const BooksGate = createGate<{ t: (key: string) => string }>();