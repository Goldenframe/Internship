import { BookItem } from "@/entities/book-item";
import { BASE_URL } from "@/shared/config/env";

import { useFetch } from "../lib/use-fetch";

import styles from "./styles.module.scss";

export const FetchBlock = () => {
    const { data, loading, fetchData } = useFetch(BASE_URL);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Fetch Block</h2>
            <button
                onClick={fetchData}
                disabled={loading}
                className={styles.button}
            >
                {loading ? "Загрузка..." : "Загрузить через Fetch"}
            </button>

            <ul className={styles.list}>
                {data.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </ul>
        </div>
    );
};
