import { BASE_URL } from "@/shared/config/env";
import { Book } from "@/shared/model/types/books";
import { createEffect } from "effector";
import { toast } from "react-toastify";
import { MAX_RESULT } from "./config";

interface FetchBooksParams {
    query: string;
    startIndex: number;
    t: (key: string) => string;
}


export const fetchBooksFx = createEffect<FetchBooksParams, Book[]>(
    async ({ query, startIndex, t }) => {
        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${MAX_RESULT}`;

        try {
            const fetchPromise = fetch(url).then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            });

            toast.promise(fetchPromise, {
                pending: t("toast.pendingBooks"),
                success: {
                    render({ data }): string {
                        if (!data.items) {
                            return startIndex > 0
                                ? t("toast.allBooksLoaded")
                                : t("toast.noBooksFound");
                        }
                        const receivedCount = data.items.length;
                        return receivedCount > 1
                            ? `${receivedCount} ${t("toast.successManyBooks")}`
                            : t("toast.successOneBooks");
                    },
                },
                error: {
                    render({ data }: { data: Error }): string {
                        return data?.message || t("toast.errorBook");
                    },
                },
            });

            const data = await fetchPromise;
            return data.items || [];
        } catch (error) {
            toast.error(t("toast.errorBook"));
            throw error;
        }
    }
);