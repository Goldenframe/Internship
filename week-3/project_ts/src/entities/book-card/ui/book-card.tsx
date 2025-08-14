import React, { useState, Suspense, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookDescripton = React.lazy(() => import("@/entities/book-card/ui/book-description").then(module => ({ default: module.BookDescripton })));
import { sleep } from "@/shared/lib/utils/sleep";
import type { Book, VolumeInfo } from "@/shared/model/types/books";
import { FavoriteIcon } from "@/shared/ui/favorite-icon/favorite-icon";
import { Spinner } from "@/shared/ui/spinner/spinner";
const BookDetailsModalBody = React.lazy(() => import("@/widgets/book-details-modal-body/ui/ui/book-details-modal-body").then(async module => { await sleep(600); return { default: module.BookDetailsModalBody } }))

import { useFavoriteBook } from "../lib/use-favorite-book";

import styles from './book-card.module.scss'

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
    <div className={styles["book-item"]} onClick={() => { setBookClicked(book), setShowModal(prev => !prev) }}>
      {isFavorite && (
        <div className={styles["book-item-favorite-icon"]}>
          <FaHeart />
        </div>
      )}
      {showModal && modalRoot && createPortal(<Suspense fallback={<div className={styles["modal-overlay"]}>
        <Spinner />
      </div>}><BookDetailsModalBody favorites={favorites} setFavorites={setFavorites} bookId={book.id} setShowModal={setShowModal} /></Suspense>, modalRoot)}

      <div className={styles["book-item-image-container"]}>
        {bookInfo.imageLinks ? (
          <img
            src={bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail.replace("http://", "https://") : ""}
            alt={bookInfo.title ? bookInfo.title : ""}
            className={styles["book-item-image"]}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null;
              target.src = "";
              target.parentElement!.innerHTML = `<div class="book-item-no-image">${t("common.noCover")}</div>`;
            }}
          />
        ) : (
          <div className={styles["book-item-no-image"]}>{t("common.noCover")}</div>
        )}
      </div>

      <h3 className={styles["book-item-title"]}>{bookInfo.title}</h3>

      <p className={styles["book-item-authors"]}>
        {bookInfo.authors?.join(", ") || t("common.unknownAuthor")}
      </p>
      <Suspense fallback={<Spinner />}>
        <BookDescripton shortDescription={shortDescription} />
      </Suspense>

      <div className={styles["book-item-actions"]}>
        <button
          className={`book-item-button like ${isFavorite ? t("bookCard.liked") : ""}`}
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
