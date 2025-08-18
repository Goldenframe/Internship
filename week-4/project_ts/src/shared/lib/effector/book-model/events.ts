import { createEvent } from "effector";

export const SearchFormSubmitted = createEvent<void>();
export const LoadedMore = createEvent<number>();
export const startIndexUpdated = createEvent<number>();
export const hasMoreUpdated = createEvent<boolean>();
export const filterUpdated = createEvent<string>();
export const searchInputUpdated = createEvent<string>();
export const resetPagination = createEvent<void>();
