import React, { useState, Suspense, useCallback, memo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookDescripton = React.lazy(() => import("@/components/book-description"));
import { Spinner } from "@/components/spinner";
import type { Book, VolumeInfo } from "@/types/books";



interface BookCardProps {
  book: Book,
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>;
  setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>;
}

type BookCardInfo = Pick<VolumeInfo, "title" | "authors" | "imageLinks" | "description">

export const BookCard = memo(function BookCard({ book, favorites, setFavorites, setBookClicked }: BookCardProps) {

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === book.id)
  );

  const handleClick = useCallback(() => {
    const willBeFavorite = !isFavorite;

    if (willBeFavorite) {
      setFavorites((prev) => [...prev, book]);
      toast.success("Added to favorites!");
    } else {
      setFavorites((prev) => prev.filter((el) => el.id !== book.id));
      toast.warning("Removed from favorites!");
    }

    setIsFavorite(willBeFavorite);
  }, [book, isFavorite, setFavorites])

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
    "No description available";

  return (
    <div className="book-item" onClick={()=>{setBookClicked(book)}}>
      {isFavorite && (
        <div className="book-item-favorite-icon">
          <FaHeart />
        </div>
      )}

      <Link to={`/book/${book.id}`} className="book-item-link">
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
                target.parentElement!.innerHTML = '<div class="book-item-no-image">No Cover</div>';
              }}
            />
          ) : (
            <div className="book-item-no-image">No Cover</div>
          )}
        </div>

        <h3 className="book-item-title">{bookInfo.title}</h3>

        <p className="book-item-authors">
          {bookInfo.authors?.join(", ") || "Author unknown"}
        </p>
        <Suspense fallback={<Spinner />}>
          <BookDescripton shortDescription={shortDescription} />
        </Suspense>
      </Link>

      <div className="book-item-actions">
        <button
          className={`book-item-button like ${isFavorite ? "liked" : ""}`}
          onClick={handleClick}
        >
          {isFavorite ? (
            <>
              <FaHeart className="favorite-icon" />
              Liked
            </>
          ) : (
            <>
              <FaRegHeart />
              Like
            </>
          )}
        </button>
      </div>
    </div>
  );
})