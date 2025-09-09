import React, { useState } from "react";
import styles from "./styles.module.css";
import { Book } from "@/types/books";
import Image from "next/image";

interface BookItemProps {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: (book: Book) => void;
}

export const BookItem = ({ book, isFavorite, onToggleFavorite }: BookItemProps) => {
    const [imgError, setImgError] = useState(false);
    const bookInfo = book.volumeInfo;
    const thumbnail = bookInfo.imageLinks?.thumbnail;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(book);
    };

    return (
        <div className={styles.bookItem}>
            <div className={styles.bookItemImageContainer}>
                {thumbnail && !imgError ? (
                    <Image
                        loading="lazy"
                        src={thumbnail}
                        alt={bookInfo.title ?? "Book thumbnail"}
                        className={styles.bookItemImage}
                        onError={() => setImgError(true)}
                        width={300}
                        height={500}
                    />
                ) : (
                    <div className={styles.bookItemNoImage}>No Cover</div>
                )}
            </div>

            <h3 className={styles.bookItemTitle}>{bookInfo.title}</h3>

            <p className={styles.bookItemAuthors}>
                {bookInfo.authors?.join(", ")}
            </p>

            <button
                onClick={handleFavoriteClick}
                className={styles.actionButton}
            >
                {isFavorite ? '★ Убрать из избранного' : '☆ В избранное'}
            </button>
        </div>
    );
};