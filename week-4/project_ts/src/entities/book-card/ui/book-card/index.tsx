import { invoke } from '@withease/factories';
import { useUnit } from "effector-react";
import React, { useState, Suspense, memo, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const BookDescripton = React.lazy(() => import("@/entities/book-card/ui/book-description/index").then(module => ({ default: module.BookDescripton })));
const BookModal = React.lazy(() => import("@/features/modal-book-details/ui").then(async module => {
  await sleep(600);
  return { default: module.BookModal }
}));

import { model } from "@/entities/book-card/model/book-model";
import { createBookModel } from '@/entities/book-card/model/book-model/factories';
import { sleep } from "@/shared/lib/utils/sleep";
import type { Book, VolumeInfo } from "@/shared/model/types/books";
import { FavoriteIcon, Spinner } from "@/shared/ui/atoms";

import styles from './styles.module.scss'

const modalRoot = document.getElementById("modal-root");

interface BookCardProps {
  book: Book;
}

type BookCardInfo = Pick<VolumeInfo, "title" | "authors" | "imageLinks" | "description">

export const BookCard = memo(({ book }: BookCardProps) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [favorites, favoriteToggled] = useUnit([model.$favorites, model.favoriteToggled]);

  const bookModalModel = useMemo(() => invoke(createBookModel), []);
  const isFavorite = favorites.some((el) => el.id === book.id);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavorite) {
      favoriteToggled(book);
      toast.warning(t("toast.removedFromFavorites"));
    } else {
      favoriteToggled(book);
      toast.success(t("toast.addedToFavorites"));
    }
  };

  const handleBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    <>
      <div className={styles.bookItem} onClick={handleBookClick}>
        {isFavorite && (
          <div className={styles.bookItemFavoriteIcon}>
            <FaHeart />
          </div>
        )}

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

      {showModal && modalRoot && createPortal(
        <Suspense fallback={
          <div className={styles.modalOverlay}>
            <Spinner />
          </div>
        }>
          <BookModal
            bookId={book.id}
            isOpen={showModal}
            onClose={handleCloseModal}
            onFavoriteToggle={favoriteToggled}
            isFavorite={isFavorite}
            bookModel={bookModalModel}
          />
        </Suspense>,
        modalRoot
      )}
    </>
  );
});