import { createEvent } from "effector";

export const searchFormSubmitted = createEvent<void>();
export const loadedMore = createEvent<number>();
export const startIndexUpdated = createEvent<number>();
export const hasMoreUpdated = createEvent<boolean>();
export const filterUpdated = createEvent<string>();
export const searchInputUpdated = createEvent<string>();
export const resetPagination = createEvent<void>();
