import DOMPurify from 'dompurify';
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaHeart,
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { fetchJSON } from '@/api/book-service';
import type { Book, VolumeInfo } from '@/types/books';

interface BookDetailsProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
  bookId: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const BookDetails = ({ favorites, setFavorites, bookId, setShowModal }: BookDetailsProps) => {
  const { t } = useTranslation();
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === bookId)
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}${bookId}`

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
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

  if (!bookDetails) {
    return null;
  }

  const book: Partial<VolumeInfo> = bookDetails.volumeInfo;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}>
        <div className="book-details">
          <div className="book-cover">
            {book.imageLinks ? (
              <img
                src={book.imageLinks.thumbnail?.replace("http://", "https://")}
                alt={book.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null;
                  target.parentElement!.innerHTML = '<div class="no-image"><FaBookOpen size="48" /></div>';
                }}
              />
            ) : (
              <div className="no-image">
                <FaBookOpen size={48} />
              </div>
            )}
          </div>
          <div className="book-info">
            <h1 className="book-title">{book.title ? book.title : "No title"}</h1>
            {book.authors && book.authors?.length > 0 && (
              <div className="book-authors">
                {book.authors.map((author, index) => (
                  <span key={index} className="book-author">
                    {author}
                  </span>
                ))}
              </div>
            )}

            <div className="book-meta">
              {book.publishedDate && (
                <div className="book-meta-item">
                  <FaCalendarAlt />
                  <span>{t('bookDetails.published')}: {book.publishedDate}</span>
                </div>

              )}

              {book.pageCount && (
                <div className="book-meta-item">
                  <FaBookOpen />
                  <span>{book.pageCount} {t('common.pages')}</span>
                </div>
              )}

              {book.averageRating && (
                <div className="book-meta-item">
                  <span>⭐ {book.averageRating}/5</span>
                </div>
              )}
            </div>

            {book.description ? (
              <div
                className="book-description"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.description),
                }}
              />
            ) : (
              <div className="book-description">{t("common.noDescription")}.</div>
            )}

            <div className="book-actions">
              <button
                className={`action-button like-button ${isFavorite ? `${t("bookCard.liked")}` : ""
                  }`}
                onClick={handleFavoriteClick}
              >
                <FaHeart className="favorite-icon" />
                {isFavorite ? `${t("bookCard.removeFromFavorites")}` : `${t("bookCard.addToFavorites")}`}
              </button>

              <button
                className="action-button back-button"
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
