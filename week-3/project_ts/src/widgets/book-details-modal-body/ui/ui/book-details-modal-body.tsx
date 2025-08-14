import DOMPurify from 'dompurify';
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { fetchJSON } from '@/shared/api/book-service/book-service';
import type { Book, VolumeInfo } from '@/shared/model/types/books';
import { FavoriteIcon } from '@/shared/ui/favorite-icon/favorite-icon';
import { Spinner } from '@/shared/ui/spinner/spinner';

import styles from './book-details-modal-body.module.scss';

interface BookDetailsProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
  bookId: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const BookDetailsModalBody = ({ favorites, setFavorites, bookId, setShowModal }: BookDetailsProps) => {
  const { t } = useTranslation();
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === bookId)
  );
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}${bookId}`

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setIsLoading(true);
        const fetchPromise = fetchJSON<Book>(url, t("toast.bookDetailsNotFound"));
        toast.promise(fetchPromise, {
          pending: t("toast.pendingBookDetails"),
          success: t("toast.successBookDetals"),
          error: {
            render({ data }: any) {
              return data?.message || t("toast.errorBookDetails");
            },
          },
        });

        const data: Book = await fetchPromise;
        setBookDetails(data);
      } catch (err) {
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, url, t]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!bookDetails) return;

    const willBeFavorite = !isFavorite;
    if (willBeFavorite) {
      setFavorites((prev) => [...prev, bookDetails]);
      toast.success(t("toast.addedToFavorites"));
    } else {
      setFavorites((prev) => prev.filter((el) => el.id !== bookDetails.id));
      toast.info(t("toast.removedFromFavorites"));
    }
    setIsFavorite(willBeFavorite);
  }, [bookDetails, isFavorite, setFavorites, t]);

  if (isLoading) {
    return <div className={styles['modal-overlay']}><Spinner /></div>;
  }

  if (!bookDetails) {
    return null;
  }

  const book: Partial<VolumeInfo> = bookDetails.volumeInfo;

  return (
    <div className={styles['modal-overlay']}>
      <div
        className={styles['modal-content']}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}
      >
        <div className={styles['book-details']}>
          <div className={styles['book-cover']}>
            {book.imageLinks ? (
              <img
                src={book.imageLinks.thumbnail?.replace("http://", "https://")}
                alt={book.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null;
                  target.parentElement!.innerHTML = `<div class="${styles['no-image']}"><FaBookOpen size="48" /></div>`;
                }}
              />
            ) : (
              <div className={styles['no-image']}>
                <FaBookOpen size={48} />
              </div>
            )}
          </div>
          <div className={styles['book-info']}>
            <h1 className={styles['book-title']}>{book.title ? book.title : "No title"}</h1>
            {book.authors && book.authors?.length > 0 && (
              <div className={styles['book-authors']}>
                {book.authors.map((author, index) => (
                  <span key={index} className={styles['book-author']}>
                    {author}
                  </span>
                ))}
              </div>
            )}

            <div className={styles['book-meta']}>
              {book.publishedDate && (
                <div className={styles['book-meta-item']}>
                  <FaCalendarAlt />
                  <span>{t('bookDetails.published')}: {book.publishedDate}</span>
                </div>
              )}

              {book.pageCount && (
                <div className={styles['book-meta-item']}>
                  <FaBookOpen />
                  <span>{book.pageCount} {t('common.pages')}</span>
                </div>
              )}

              {book.averageRating && (
                <div className={styles['book-meta-item']}>
                  <span>⭐ {book.averageRating}/5</span>
                </div>
              )}
            </div>

            {book.description ? (
              <div
                className={styles['book-description']}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.description),
                }}
              />
            ) : (
              <div className={styles['book-description']}>{t("common.noDescription")}.</div>
            )}

            <div className={styles['book-actions']}>
              <button
                className={`${styles['action-button']} ${styles['like-button']} ${isFavorite ? styles['liked'] : ''
                  }`}
                onClick={handleFavoriteClick}
              >
                <FavoriteIcon />
                {isFavorite ? `${t("bookCard.removeFromFavorites")}` : `${t("bookCard.addToFavorites")}`}
              </button>

              <button
                className={`${styles['action-button']} ${styles['back-button']}`}
                onClick={() => setShowModal(false)}
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
