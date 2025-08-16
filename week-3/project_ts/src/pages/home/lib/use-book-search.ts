import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { fetchJSON } from "@/shared/api/book-service";
import { Book, SearchResponse } from "@/shared/model/types/books";

interface UseBookSearchProps {
    startIndex: number,
    setStartIndex: React.Dispatch<React.SetStateAction<number>>,
    hasMore: boolean,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
}

export const useBookSearch = ({ startIndex, setStartIndex, hasMore, setHasMore }: UseBookSearchProps) => {

    const { t } = useTranslation();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("JavaScript");
    const [query, setQuery] = useState("JavaScript");

    const maxResult = 20;

    const BASE_URL: string = import.meta.env.VITE_BASE_URL;

    const fetchData = useCallback(async (query: string, startIndex: number) => {
        setLoading(true);
        try {
            let url = `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResult}`

            const fetchPromise = fetchJSON<SearchResponse>(url, t("toast.noBooksFound"));

            toast.promise(fetchPromise, {
                pending: t("toast.pendingBooks"),
                success: {
                    render({ data }) {
                        if (!data.items) {
                            return startIndex > 0 ? t("toast.allBooksLoaded") : t("toast.noBooksFound");
                        }
                        return data.items.length > 1
                            ? t("toast.successManyBooks", { count: data.items.length })
                            : t("toast.successOneBooks");
                    },
                },
                error: {
                    render({ data }: { data: Error }) {
                        return data?.message || t("toast.errorBook");
                    },
                },
            });

            const data = await fetchPromise;

            const newBooks = data.items || [];

            if (newBooks.length === 0 && startIndex !== 0) {
                setHasMore(false);
                return;
            }

            if (newBooks.length < maxResult) setHasMore(false);

            setBooks((prev) =>
                startIndex === 0 ? newBooks : [...prev, ...newBooks]
            );
        } catch (err) {
            setBooks([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [BASE_URL, t, setHasMore]);

    useEffect(() => {
        fetchData(query, startIndex);
    }, [fetchData, query, startIndex]);


    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setBooks([]);
        setStartIndex(0);
        setHasMore(true);
        if (searchInput !== query) {
            setQuery(searchInput);
        } else {
            fetchData(query, 0);
        }
    }, [searchInput, query, fetchData, setHasMore, setStartIndex]);

    const onLoadMore = (currentStartIndex: number) => {
        if (hasMore && !loading) {
            setStartIndex(currentStartIndex + maxResult);
        }
    }

    return { books, loading, searchInput, setSearchInput, handleSubmit, onLoadMore }
}