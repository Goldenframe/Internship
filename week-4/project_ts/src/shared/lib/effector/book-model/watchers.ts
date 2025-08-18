import { $books, $startIndex, $hasMore, $filter, $searchInput, startIndexUpdated, hasMoreUpdated, resetPagination, filterUpdated, searchInputUpdated } from '@/shared/lib/effector/book-model';
import { Book } from '@/shared/model/types/books';

$books.watch((books: Book[]): void => {
    console.log("Books list changed:", books);
});

$startIndex
    .on(startIndexUpdated, (_, startIndex) => startIndex)
    .reset(resetPagination)
    .watch((startIndex) => {
        console.log("startIndex changed:", startIndex);
    });

$hasMore
    .on(hasMoreUpdated, (_, hasMore) => hasMore)
    .reset(resetPagination)
    .watch((hasMore) => {
        console.log("hasMore changed:", hasMore);
    });

$filter
    .on(filterUpdated, (_, filter) => filter)
    .watch((filter) => {
        console.log("filter changed:", filter);
    });

$searchInput
    .on(searchInputUpdated, (_, searchInput) => searchInput)