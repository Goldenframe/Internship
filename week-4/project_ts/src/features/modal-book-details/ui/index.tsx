import DOMPurify from 'dompurify';
import { useUnit } from 'effector-react';
import React, { useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { Book } from '@/shared/model/types/books';
import { FavoriteIcon, Spinner } from '@/shared/ui/atoms';

import styles from './styles.module.scss';

interface BookModalProps {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle: (book: Book) => void;
  isFavorite: boolean;
  bookModel: ReturnType<typeof import('@/entities/book-card/model/book-model/factories').createBookModel>;
}

export const BookModal = ({
  bookId,
  isOpen,
  onClose,
  onFavoriteToggle,
  isFavorite,
  bookModel
}: BookModalProps) => {
  const { t } = useTranslation();

  const [
    bookDetails,
    isLoading,
    bookDetailsOpened,
    bookDetailsClosed,
    tUpdated,
  ] = useUnit([
    bookModel.$bookDetails,
    bookModel.$isLoading,
    bookModel.bookDetailsOpened,
    bookModel.bookDetailsClosed,
    bookModel.tUpdated,
  ]);

  useEffect(() => {
    if (isOpen && bookId) {
      tUpdated(t);
      bookDetailsOpened(bookId);
    } else {
      bookDetailsClosed();
    }

    return () => {
      bookDetailsClosed();
    };
  }, [isOpen, bookId, t, bookDetailsOpened, bookDetailsClosed, tUpdated]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!bookDetails) return;

    onFavoriteToggle(bookDetails);

    const willBeFavorite = !isFavorite;
    if (willBeFavorite) {
      toast.success(t("toast.addedToFavorites"));
    } else {
      toast.info(t("toast.removedFromFavorites"));
    }
  }, [bookDetails, isFavorite, t, onFavoriteToggle]);

  const handleClose = useCallback(() => {
    onClose();
    bookDetailsClosed();
  }, [onClose, bookDetailsClosed]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div
        className={styles.modalContent}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}
      >
        {isLoading ? (
          <Spinner />
        ) : bookDetails && (
          <div className={styles.bookDetails}>
            <div className={styles.bookCover}>
              {bookDetails.volumeInfo?.imageLinks ? (
                <img
                  src={bookDetails.volumeInfo.imageLinks.thumbnail?.replace("http://", "https://")}
                  alt={bookDetails.volumeInfo.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null;
                    target.parentElement!.innerHTML = `<div class="${styles.noImage}"><FaBookOpen size="48" /></div>`;
                  }}
                />
              ) : (
                <div className={styles.noImage}>
                  <FaBookOpen size={48} />
                </div>
              )}
            </div>

            <div className={styles.bookInfo}>
              <h1 className={styles.bookTitle}>{bookDetails.volumeInfo?.title || "No title"}</h1>

              {bookDetails.volumeInfo?.authors && bookDetails.volumeInfo.authors.length > 0 && (
                <div className={styles.bookAuthors}>
                  {bookDetails.volumeInfo.authors.map((author, index) => (
                    <span key={index} className={styles.bookAuthor}>
                      {author}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.bookMeta}>
                {bookDetails.volumeInfo?.publishedDate && (
                  <div className={styles.bookMetaItem}>
                    <FaCalendarAlt />
                    <span>{t('bookDetails.published')}: {bookDetails.volumeInfo.publishedDate}</span>
                  </div>
                )}

                {bookDetails.volumeInfo?.pageCount && (
                  <div className={styles.bookMetaItem}>
                    <FaBookOpen />
                    <span>{bookDetails.volumeInfo.pageCount} {t('common.pages')}</span>
                  </div>
                )}

                {bookDetails.volumeInfo?.averageRating && (
                  <div className={styles.bookMetaItem}>
                    <span>⭐ {bookDetails.volumeInfo.averageRating}/5</span>
                  </div>
                )}
              </div>

              {bookDetails.volumeInfo?.description ? (
                <div
                  className={styles.bookDescription}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(bookDetails.volumeInfo.description),
                  }}
                />
              ) : (
                <div className={styles.bookDescription}>{t("common.noDescription")}.</div>
              )}

              <div className={styles.bookActions}>
                <button
                  className={`${styles.actionButton} ${styles.likeButton} ${isFavorite ? styles.liked : ''}`}
                  onClick={handleFavoriteClick}
                >
                  <FavoriteIcon />
                  {isFavorite ? t("bookCard.removeFromFavorites") : t("bookCard.addToFavorites")}
                </button>

                <button
                  className={`${styles.actionButton} ${styles.backButton}`}
                  onClick={handleClose}
                >
                  <FaArrowLeft />
                  {t("common.backToSearch")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};