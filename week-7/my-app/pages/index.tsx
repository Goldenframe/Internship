import { useEffect, useState } from "react";
import { fetchJSON } from "@/lib/api/fetch-json";
import { Book, SearchResponse } from "@/types/books";
import BookList from "@/features/book-list";
import { useFavorites } from "@/lib/hooks/use-favorite";
import { Spinner } from "@/components/spinner";

export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        fetchJSON<SearchResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}?q=javascript&startIndex=0&maxResults=20`,
            "Books were not found"
        )
            .then((data) => setBooks(data.items || []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <BookList
            books={books}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
        />
    );
}
