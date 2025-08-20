import DOMPurify from 'dompurify';
import React, { useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { VolumeInfo } from '@/shared/model/types/books';
import { FavoriteIcon } from '@/shared/ui/atoms/favorite-icon';
import { Spinner } from '@/shared/ui/atoms/spinner';

import styles from './styles.module.scss';
import { model as bookModalModel } from '../book-modal-model';
import { model as favoritesModel } from "@/shared/model/favorites-model";
import { useUnit } from 'effector-react';

interface BookDetailsProps {
  bookId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BookDetailsModalBody = ({ bookId, setShowModal }: BookDetailsProps) => {
  const { t } = useTranslation();

  const [
    bookDetails,
    isLoading,
    bookDetailsOpened,
    bookDetailsClosed,
    tUpdated,
  ] = useUnit([
    bookModalModel.$bookDetails,
    bookModalModel.$isLoading,
    bookModalModel.bookDetailsOpened,
    bookModalModel.bookDetailsClosed,
    bookModalModel.tUpdated,
  ]);
  
  const [favorites, favoriteToggled] = useUnit([favoritesModel.$favorites, favoritesModel.favoriteToggled]);

  const isFavorite = favorites.some((el) => el.id === bookId);

  useEffect(() => {
    tUpdated(t);
    bookDetailsOpened(bookId);

    return () => {
      bookDetailsClosed();
    };
  }, [bookId, t, bookDetailsOpened, bookDetailsClosed, tUpdated]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!bookDetails) return;

    favoriteToggled(bookDetails);

    const willBeFavorite = !isFavorite;
    if (willBeFavorite) {
      toast.success(t("toast.addedToFavorites"));
    } else {
      toast.info(t("toast.removedFromFavorites"));
    }
  }, [bookDetails, isFavorite, t, favoriteToggled]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    bookDetailsClosed();
  }, [setShowModal, bookDetailsClosed]);

  if (isLoading) {
    return <div className={styles['modal-overlay']}><Spinner /></div>;
  }

  if (!bookDetails) {
    return null;
  }

  const book: Partial<VolumeInfo> = bookDetails.volumeInfo;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}
      >
        <div className={styles.bookDetails}>
          <div className={styles.bookCover}>
            {book.imageLinks ? (
              <img
                src={book.imageLinks.thumbnail?.replace("http://", "https://")}
                alt={book.title}
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
            <h1 className={styles.bookTitle}>{book.title ? book.title : "No title"}</h1>
            {book.authors && book.authors?.length > 0 && (
              <div className={styles.bookAuthors}>
                {book.authors.map((author, index) => (
                  <span key={index} className={styles.bookAuthor}>
                    {author}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.bookMeta}>
              {book.publishedDate && (
                <div className={styles.bookMetaItem}>
                  <FaCalendarAlt />
                  <span>{t('bookDetails.published')}: {book.publishedDate}</span>
                </div>
              )}

              {book.pageCount && (
                <div className={styles.bookMetaItem}>
                  <FaBookOpen />
                  <span>{book.pageCount} {t('common.pages')}</span>
                </div>
              )}

              {book.averageRating && (
                <div className={styles.bookMetaItem}>
                  <span>⭐ {book.averageRating}/5</span>
                </div>
              )}
            </div>

            {book.description ? (
              <div
                className={styles.bookDescription}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.description),
                }}
              />
            ) : (
              <div className={styles.bookDescription}>{t("common.noDescription")}.</div>
            )}

            <div className={styles.bookActions}>
              <button
                className={`${styles.actionButton} ${styles.likeButton} ${isFavorite ? styles.liked : ''
                  }`}
                onClick={handleFavoriteClick}
              >
                <FavoriteIcon />
                {isFavorite ? `${t("bookCard.removeFromFavorites")}` : `${t("bookCard.addToFavorites")}`}
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
      </div>
    </div>
  );
}