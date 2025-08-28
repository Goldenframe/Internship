import { createEvent } from "effector";

import { Book } from "@/shared/model/types/books";

export const searchFormSubmitted = createEvent<void>();
export const loadedMore = createEvent<void>();
export const startIndexUpdated = createEvent<number>();
export const hasMoreUpdated = createEvent<boolean>();
export const filterUpdated = createEvent<string>();
export const searchInputUpdated = createEvent<string>();
export const queryUpdated = createEvent<string>();
export const resetPagination = createEvent<void>();
export const favoriteToggled = createEvent<Book>();
export const modalOpened = createEvent<{ bookId: string; t: (key: string) => string }>();
export const modalClosed = createEvent<void>();
export const clearSearch =createEvent<void>();
export const startModalDelay = createEvent();
export const bookViewed = createEvent<string>();