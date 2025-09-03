import { useState } from "react";

import { Book } from "@/shared/model/types/books";

import styles from "./styles.module.scss";

interface BookItemProps {
    book: Book;
}

export const BookItem = ({ book }: BookItemProps) => {
    const [imgError, setImgError] = useState(false);

    const title = book.volumeInfo?.title || "Без названия";
    const authors = book.volumeInfo?.authors?.join(", ") || "Автор неизвестен";
    const thumbnail = book.volumeInfo?.imageLinks?.thumbnail
        ? book.volumeInfo.imageLinks.thumbnail.replace("http://", "https://")
        : "";
    const description =
        book.searchInfo?.textSnippet ||
        book.volumeInfo?.description ||
        "Описание отсутствует";

    return (
        <li className={styles.item}>
            <div className={styles.bookCard}>
                <div className={styles.bookImage}>
                    {thumbnail && !imgError ? (
                        <img
                            src={thumbnail}
                            alt={title}
                            loading="lazy"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className={styles.noImage}>Нет обложки</div>
                    )}
                </div>
                <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>{title}</h3>
                    <p className={styles.bookAuthors}>{authors}</p>
                    <p className={styles.bookDescription}>{description}</p>
                </div>
            </div>
        </li>
    );
};
