import DOMPurify from 'dompurify';
import { useUnit } from 'effector-react';
import React, { useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";

import { model } from '@/entities/book-card/model/book-model';
import { useBroadcastChannel } from '@/shared/lib/hooks/use-broadcast-channel';
import { useFetch } from '@/shared/lib/hooks/use-fetch';
import { Book } from '@/shared/model/types/books';
import { FavoriteIcon, Spinner } from '@/shared/ui/atoms';

import styles from './styles.module.scss';

interface ModalBooksDetailsProps {
  bookModel: ReturnType<typeof model.createBookModel>;
  modalClosed: () => void;
  favoriteToggled: (book: Book) => void,
  sessionFavoriteToggled: (book: Book) => void,
}

export const ModalBooksDetails = ({
  bookModel,
  modalClosed,
  favoriteToggled,
  sessionFavoriteToggled
}: ModalBooksDetailsProps) => {
  const { t } = useTranslation();

  const [
    bookDetails,
    status,
    fetchBookDetailsFx,
    isModalOpen,
  ] = useUnit([
    bookModel.$bookDetailsWithFavorite,
    bookModel.$status,
    bookModel.fetchBookDetailsFx,
    model.$isModalOpen,
  ]);

  const { sendMessage } = useBroadcastChannel<Book>("favorites");

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!bookDetails) return;
    sendMessage(bookDetails);
    favoriteToggled(bookDetails);
    sessionFavoriteToggled(bookDetails);
  }, [bookDetails, sendMessage, favoriteToggled, sessionFavoriteToggled]);

  const handleClose = useCallback(() => {
    modalClosed();
  }, [modalClosed]);

  useFetch(bookDetails?.id ?? null, fetchBookDetailsFx);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {status === "pending" && (
          <div className={styles.loader}>
            <Spinner />
          </div>
        )}

        {status !== "pending" && bookDetails && (
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
                  className={`${styles.actionButton} ${styles.likeButton} ${bookDetails.isFavorite ? styles.liked : ''}`}
                  onClick={handleFavoriteClick}
                >
                  <FavoriteIcon />
                  {bookDetails.isFavorite ? t("bookCard.removeFromFavorites") : t("bookCard.addToFavorites")}
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
