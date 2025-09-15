import Image from 'next/image';
import React, { useState } from 'react';

import { Book } from '@/types/books';

import styles from './styles.module.css';

interface BookItemProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
  index: number;
}

export const BookItem = ({ book, isFavorite, onToggleFavorite, index }: BookItemProps) => {
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
            src={thumbnail}
            alt={bookInfo.title ?? 'Book thumbnail'}
            className={styles.bookItemImage}
            onError={() => setImgError(true)}
            priority={index < 7}
            fill
            sizes="120px"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mP8z/C/HwAFAwIA0j9c9AAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className={styles.bookItemNoImage}>No Cover</div>
        )}
      </div>

      <h3 className={styles.bookItemTitle}>{bookInfo.title}</h3>

      <p className={styles.bookItemAuthors}>{bookInfo.authors?.join(', ')}</p>

      <button onClick={handleFavoriteClick} className={styles.actionButton}>
        {isFavorite ? '★ Убрать из избранного' : '☆ В избранное'}
      </button>
    </div>
  );
};
