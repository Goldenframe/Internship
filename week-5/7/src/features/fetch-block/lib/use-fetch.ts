import { useState } from "react"

import { fetchJSON } from "@/shared/api/fetch";
import { Book, SearchResponse } from "@/shared/model/types/books"


export const useFetch = (url: string) => {
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchJSON<SearchResponse>(url);

                if (response.items) {
                    setData(response.items);
                }
            }
            catch {
                setData([]);
            } finally {
                setLoading(false);
            }
            return data;
        }


    return {data, loading, fetchData}

}