import { createEffect } from "effector";
import { delay } from 'patronum/delay'; 
import { toast } from "react-toastify";

import { BASE_URL } from "@/shared/config/env";
import { addFavorites } from "@/shared/lib/utils/local-storage/favorites";
import { Book } from "@/shared/model/types/books";

import { MAX_RESULT } from "./config";
import { startModalDelay } from "./events";

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

export const saveFavoritesFx = createEffect<Book[], void>((favorites) => {
    addFavorites(localStorage, favorites);
});

export const saveSessionFavoritesFx = createEffect<Book[], void>((sessionFavorites) => {
    addFavorites(sessionStorage, sessionFavorites);
});

export const modalDelayedEvent = delay({
  source: startModalDelay,
  timeout: 600,
});

export const loadModalWithDelayFx = createEffect(async () => {
  startModalDelay();
  await modalDelayedEvent;
});