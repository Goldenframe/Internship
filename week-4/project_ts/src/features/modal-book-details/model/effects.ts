import { createEffect } from "effector";
import { toast } from "react-toastify";

import { BASE_URL } from "@/shared/config/env";
import { Book } from "@/shared/model/types/books";

interface FetchBookDetailsParams {
  bookId: string;
  t: (key: string) => string;
}

export const fetchBookDetailsFx = createEffect<FetchBookDetailsParams, Book>(
  async ({ bookId, t }) => {
    const url = `${BASE_URL}${bookId}`;

    try {
      const fetchPromise = fetch(url).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      });

      toast.promise(fetchPromise, {
        pending: t("toast.pendingBookDetails"),
        success: t("toast.successBookDetals"),
        error: {
          render({ data }: { data: Error }): string {
            return data?.message || t("toast.errorBookDetails");
          },
        },
      });

      const data = await fetchPromise;
      return data;
    } catch (error) {
      toast.error(t("toast.errorBookDetails"));
      throw error;
    }
  }
);