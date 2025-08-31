import { useUnit } from "effector-react";
import React, { Suspense, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookDescription = React.lazy(() => import("@/entities/book-card/ui/book-description/index").then(module => ({ default: module.BookDescription })));

import { model } from "@/entities/book-card/model/book-model";
import { useBroadcastChannel } from "@/shared/lib/hooks/use-broadcast-channel";
import type { Book, VolumeInfo } from "@/shared/model/types/books";
import { FavoriteIcon, Spinner } from "@/shared/ui/atoms";

import { useIntersectionObserver } from "../../lib/use-intersection-observer";

import styles from './styles.module.scss'

interface BookCardProps {
  book: Book;
  isFavorite: boolean
}

type BookCardInfo = Pick<VolumeInfo, "title" | "authors" | "imageLinks" | "description">

export const BookCard = memo(({ book, isFavorite }: BookCardProps) => {
  const { t } = useTranslation();
  const [sessionFavoriteToggled, modalOpened] = useUnit([model.sessionFavoriteToggled, model.modalOpened]);
  const { sendMessage } = useBroadcastChannel<Book>("favorites");


  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    sessionFavoriteToggled(book);
    sendMessage(book)
  };

  const handleBookClick = () => {
    modalOpened({ bookId: book.id, t });
  };

  const { targetRef, isIntersecting, isViewed } =
    useIntersectionObserver<HTMLDivElement>({
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
      countEachIntersect: false,
    });

  const [imgError, setImgError] = useState(false);

  const bookInfo: BookCardInfo = {
    title: book.volumeInfo?.title || '',
    authors: book.volumeInfo?.authors || [],
    imageLinks: book.volumeInfo?.imageLinks || {},
    description: book.volumeInfo?.description || '',
  };

  if (!bookInfo) return null;

  const shortDescription =
    book.searchInfo?.textSnippet ||
    bookInfo.description ||
    t("common.noDescription");

  const thumbnail = bookInfo.imageLinks?.thumbnail
    ? bookInfo.imageLinks.thumbnail.replace('http://', 'https://')
    : '';

  return (
    <div
      className={styles.bookItem}
      onClick={handleBookClick}
      ref={targetRef}
      id={`book-${book.id}`}
    >
      {isFavorite && (
        <div className={styles.bookItemFavoriteIcon}>
          <FaHeart />
        </div>
      )}
      <div className={styles.bookItemImageContainer}>
        {thumbnail && !imgError ? (
          <img
            loading="lazy"
            src={isIntersecting ? thumbnail : undefined}
            alt={bookInfo.title}
            className={styles.bookItemImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.bookItemNoImage}>{t('common.noCover')}</div>
        )}
      </div>
      <div>Просмотрено: {isViewed ? 'Да' : 'Нет'}</div>
      <h3 className={styles.bookItemTitle}>{bookInfo.title}</h3>

      <p className={styles.bookItemAuthors}>
        {bookInfo.authors?.join(", ") || t("common.unknownAuthor")}
      </p>

      <Suspense fallback={<Spinner />}>
        <BookDescription shortDescription={shortDescription} />
      </Suspense>

      <div className={styles.bookItemActions}>
        <button
          className={`${styles.bookItemButton} like ${isFavorite ? t("bookCard.liked") : ""}`}
          onClick={handleFavoriteClick}
          type="button"
        >
          {isFavorite ? (
            <>
              <FavoriteIcon />
              {t("bookCard.liked")}
            </>
          ) : (
            <>
              <FaRegHeart />
              {t("bookCard.like")}
            </>
          )}
        </button>
      </div>
    </div>
  );
});