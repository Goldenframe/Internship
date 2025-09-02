import { useState } from "react";

import { xhrRequest } from "@/shared/api/xhr";
import { Book, SearchResponse } from "@/shared/model/types/books";

export const useXhr = (url: string) => {
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    const requestData = async () => {
        setLoading(true);
        try {
            const response = await xhrRequest<SearchResponse>(url);
            setData(response.items ?? []);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, requestData };
};