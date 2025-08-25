import { useUnit } from "effector-react";
import React, { Suspense, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookDescription = React.lazy(() => import("@/entities/book-card/ui/book-description/index").then(module => ({ default: module.BookDescription })));


import { model } from "@/entities/book-card/model/book-model";
import type { Book, VolumeInfo } from "@/shared/model/types/books";
import { FavoriteIcon, Spinner } from "@/shared/ui/atoms";

import { useIntersectionObserver } from "../../lib/use-intersection-observer ";

import styles from './styles.module.scss'

interface BookCardProps {
  book: Book;
  isFavorite: boolean

}

type BookCardInfo = Pick<VolumeInfo, "title" | "authors" | "imageLinks" | "description">

export const BookCard = memo(({ book, isFavorite }: BookCardProps) => {
  const { t } = useTranslation();
  const [favoriteToggled, modalOpened] = useUnit([model.favoriteToggled, model.modalOpened]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    favoriteToggled(book);

  };

  const handleBookClick = () => {
    modalOpened({ bookId: book.id, t });
  };

  const itemTargetElement = useRef<HTMLImageElement | null>(null);


  const { isIntersecting, views } = useIntersectionObserver(itemTargetElement);

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
      <div className={styles.bookItem} onClick={handleBookClick} ref={itemTargetElement}>
        {isFavorite && (
          <div className={styles.bookItemFavoriteIcon}>
            <FaHeart />
          </div>
        )}

        <div className={styles.bookItemImageContainer}>
          {bookInfo.imageLinks?.thumbnail ? (
            <img
              src={
                isIntersecting
                  ? bookInfo.imageLinks.thumbnail.replace("http://", "https://")
                  : undefined
              }
              data-src={bookInfo.imageLinks.thumbnail}
              alt={bookInfo.title}
              className={styles.bookItemImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "";
                target.parentElement!.innerHTML = `<div class="book-item-no-image">${t("common.noCover")}</div>`;
              }}
            />
          ) : (
            <div className={styles.bookItemNoImage}>{t("common.noCover")}</div>
          )}
        </div>
        <div>Просмотры {views}</div>
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
    </>
  );
});