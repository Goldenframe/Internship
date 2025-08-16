import { useMemo } from "react";

import { Book, FILTER_TYPES } from '@/shared/model/types/books';

interface UseBookFilter {
    books: Book[],
    filter: string
}


export const useBookFilter = ({ books, filter }: UseBookFilter) => {
    return useMemo(() => {
        let result = [...books];
        console.log('нажимаюст')
        if (filter) {
            result = result.filter(book => {
                if (filter === FILTER_TYPES.EBOOKS) {
                    return book.accessInfo?.epub?.isAvailable || book.accessInfo?.pdf?.isAvailable;
                }
                if (filter === FILTER_TYPES.FREE_EBOOKS) {
                    return book.saleInfo?.saleability === "FREE";
                }
                if (filter === FILTER_TYPES.PAID_EBOOKS) {
                    return book.saleInfo?.saleability === "FOR_SALE";
                }
                if (filter === FILTER_TYPES.FULL) {
                    return book.accessInfo?.viewability === "ALL_PAGES";
                }
                if (filter === FILTER_TYPES.PARTIAL) {
                    return book.accessInfo?.viewability === "PARTIAL";
                }
                return true;
            });
        }
        return result;
    }, [books, filter]);
}