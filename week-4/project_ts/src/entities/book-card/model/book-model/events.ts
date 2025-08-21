import { createEvent } from "effector";

import { Book } from "@/shared/model/types/books";

export const searchFormSubmitted = createEvent<void>();
export const loadedMore = createEvent<number>();
export const startIndexUpdated = createEvent<number>();
export const hasMoreUpdated = createEvent<boolean>();
export const filterUpdated = createEvent<string>();
export const searchInputUpdated = createEvent<string>();
export const queryUpdated = createEvent<string>();
export const resetPagination = createEvent<void>();
export const tUpdated = createEvent<(key: string) => string>();
export const favoriteToggled = createEvent<Book>();
