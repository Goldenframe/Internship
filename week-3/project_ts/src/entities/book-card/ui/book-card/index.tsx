import React, { useState, Suspense, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookDescripton = React.lazy(() => import("@/entities/book-card/ui/book-description/index").then(module => ({ default: module.BookDescripton })));
import { sleep } from "@/shared/lib/utils/sleep";
import type { Book, VolumeInfo } from "@/shared/model/types/books";
import { FavoriteIcon } from "@/shared/ui/atoms/favorite-icon";
import { Spinner } from "@/shared/ui/atoms/spinner";
const BookDetailsModalBody = React.lazy(() => import("@/features/book-details-modal-body/ui").then(async module => { await sleep(600); return { default: module.BookDetailsModalBody } }))

import { useFavoriteBook } from "../../lib/use-favorite-book";

import styles from './styles.module.scss'

const modalRoot = document.getElementById("modal-root");


interface BookCardProps {
  book: Book,
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
}

type BookCardInfo = Pick<VolumeInfo, "title" | "authors" | "imageLinks" | "description">

export const BookCard = memo(({ book, favorites, setFavorites, setBookClicked }: BookCardProps) => {

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { isFavorite, handleClick } = useFavoriteBook({ book, favorites, setFavorites })

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

  return (
    <div className={styles.bookItem} onClick={() => { setBookClicked(book), setShowModal(prev => !prev) }}>
      {isFavorite && (
        <div className={styles.bookItemFavoriteIcon}>
          <FaHeart />
        </div>
      )}
      {showModal && modalRoot && createPortal(<Suspense fallback={<div className={styles.modalOverlay}>
        <Spinner />
      </div>}><BookDetailsModalBody favorites={favorites} setFavorites={setFavorites} bookId={book.id} setShowModal={setShowModal} /></Suspense>, modalRoot)}

      <div className={styles.bookItemImageContainer}>
        {bookInfo.imageLinks ? (
          <img
            src={bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail.replace("http://", "https://") : ""}
            alt={bookInfo.title ? bookInfo.title : ""}
            className={styles.bookItemImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null;
              target.src = "";
              target.parentElement!.innerHTML = `<div class="book-item-no-image">${t("common.noCover")}</div>`;
            }}
          />
        ) : (
          <div className={styles.bookItemNoImage}>{t("common.noCover")}</div>
        )}
      </div>

      <h3 className={styles.bookItemTitle}>{bookInfo.title}</h3>

      <p className={styles.bookItemAuthors}>
        {bookInfo.authors?.join(", ") || t("common.unknownAuthor")}
      </p>
      <Suspense fallback={<Spinner />}>
        <BookDescripton shortDescription={shortDescription} />
      </Suspense>

      <div className={styles.bookItemActions}>
        <button
          className={`${styles.bookItemButton} like ${isFavorite ? t("bookCard.liked") : ""}`}
          onClick={handleClick}
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
})
