import React, { useState, Suspense, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const BookDescripton = React.lazy(() => import("@/components/book-description").then(module => ({ default: module.BookDescripton })));
import { Spinner } from "@/components/spinner";
const BookDetailsModalBody = React.lazy(() => import("@/modal/book-details-modal-body").then(async module => { await sleep(600); return { default: module.BookDetailsModalBody } }))
import type { Book, VolumeInfo } from "@/types/books";
import { sleep } from "@/utils/sleep";

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
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === book.id)
  );
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const willBeFavorite = !isFavorite;

    if (willBeFavorite) {
      setFavorites((prev) => [...prev, book]);
      toast.success(t("toast.addedToFavorites"));
    } else {
      setFavorites((prev) => prev.filter((el) => el.id !== book.id));
      toast.warning(t("toast.removedFromFavorites"));
    }

    setIsFavorite(willBeFavorite);
  }, [book, isFavorite, setFavorites, t])

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
    <div className="book-item" onClick={() => { setBookClicked(book), setShowModal(prev => !prev) }}>
      {isFavorite && (
        <div className="book-item-favorite-icon">
          <FaHeart />
        </div>
      )}
      {showModal && modalRoot && createPortal(<Suspense fallback={<div className="modal-overlay">
        <Spinner />
      </div>}><BookDetailsModalBody favorites={favorites} setFavorites={setFavorites} bookId={book.id} setShowModal={setShowModal} /></Suspense>, modalRoot)}

      <div className="book-item-image-container">
        {bookInfo.imageLinks ? (
          <img
            src={bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail.replace("http://", "https://") : ""}
            alt={bookInfo.title ? bookInfo.title : ""}
            className="book-item-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null;
              target.src = "";
              target.parentElement!.innerHTML = `<div class="book-item-no-image">${t("common.noCover")}</div>`;
            }}
          />
        ) : (
          <div className="book-item-no-image">{t("common.noCover")}</div>
        )}
      </div>

      <h3 className="book-item-title">{bookInfo.title}</h3>

      <p className="book-item-authors">
        {bookInfo.authors?.join(", ") || t("common.unknownAuthor")}
      </p>
      <Suspense fallback={<Spinner />}>
        <BookDescripton shortDescription={shortDescription} />
      </Suspense>

      <div className="book-item-actions">
        <button
          className={`book-item-button like ${isFavorite ? t("bookCard.liked") : ""}`}
          onClick={handleClick}
          type="button"
        >
          {isFavorite ? (
            <>
              <FaHeart className="favorite-icon" />
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
