import { BookItem } from "@/entities/book-item";
import { BASE_URL } from "@/shared/config/env";

import { useXhr } from "../lib/use-xhr";

import styles from "./styles.module.scss";

export const XhrBlock = () => {
    const { data, loading, requestData } = useXhr(BASE_URL);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Xhr Block</h2>
            <button
                onClick={requestData}
                disabled={loading}
                className={styles.button}
            >
                {loading ? "Загрузка..." : "Загрузить через Xhr"}
            </button>

            <ul className={styles.list}>
                {data.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </ul>
        </div>
    );
};
