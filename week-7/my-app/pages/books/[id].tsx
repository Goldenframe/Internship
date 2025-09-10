import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';

import { BASE_URL } from '@/config/env';
import { useFavorites } from '@/lib/hooks/use-favorite';
import { Book } from '@/types/books';

import styles from './styles.module.css';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

export const getServerSideProps = (async (context) => {
  const { query } = context;
  const id = query.id;
  if (!id) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (res.status === 404) {
      return { notFound: true };
    }

    if (!res.ok) {
      throw new Error(`Ошибка API: ${res.status}`);
    }

    const book: Book = await res.json();

    return { props: { book } };
  } catch (e) {
    console.error('Ошибка при запросе:', e);
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
}) satisfies GetServerSideProps<{ book: Book }>;

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [imgError, setImgError] = useState(false);
  const bookInfo = book.volumeInfo;
  const thumbnail = bookInfo.imageLinks?.thumbnail;
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    console.log('useEffect данные:', { book });
  }, [book]);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('useLayoutEffect компонент отрендерился:', { book });
    }
  }, [book]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
  };

  const isFavoriteBook = isFavorite(book.id);

  return (
    <main>
      {book && (
        <div className={styles.bookDetails}>
          <div className={styles.bookCover}>
            {thumbnail && !imgError ? (
              <Image
                loading="lazy"
                src={thumbnail}
                alt={bookInfo.title ?? 'Book thumbnail'}
                className={styles.bookItemImage}
                onError={() => setImgError(true)}
                width={300}
                height={500}
              />
            ) : (
              <div className={styles.bookItemNoImage}>No Cover</div>
            )}
          </div>

          <div className={styles.bookInfo}>
            <h1 className={styles.bookTitle}>{book.volumeInfo?.title || 'Без названия'}</h1>

            {book.volumeInfo?.authors && book.volumeInfo.authors.length > 0 && (
              <div className={styles.bookAuthors}>
                {book.volumeInfo.authors.map((author, index) => (
                  <span key={index} className={styles.bookAuthor}>
                    {author}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.bookMeta}>
              {book.volumeInfo?.publishedDate && (
                <div className={styles.bookMetaItem}>
                  <span>Опубликовано: {book.volumeInfo.publishedDate}</span>
                </div>
              )}

              {book.volumeInfo?.pageCount && (
                <div className={styles.bookMetaItem}>
                  <span>{book.volumeInfo.pageCount} страниц</span>
                </div>
              )}

              {book.volumeInfo?.averageRating && (
                <div className={styles.bookMetaItem}>
                  <span>⭐ {book.volumeInfo.averageRating}/5</span>
                </div>
              )}
            </div>

            <div className={styles.bookActions}>
              <button
                className={`${styles.actionButton} ${styles.likeButton} ${isFavoriteBook ? styles.liked : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFavoriteBook ? '★ Убрать из избранного' : '☆ В избранное'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
