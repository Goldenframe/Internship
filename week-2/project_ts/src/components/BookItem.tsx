import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import DOMPurify from "dompurify";
import type { Book, VolumeInfo } from "../interfaces/books";

interface BookItemProps {
  book: Book,
  favourites: Book[],
  setFavourites: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function BookItem({ book, favourites, setFavourites }: BookItemProps) {

  const [isFavourite, setIsFavourite] = useState(
    favourites.some((el) => el.id === book.id)
  );

  const handleClick = () => {
    const willBeFavourite = !isFavourite;

    if (willBeFavourite) {
      setFavourites((prev) => [...prev, book]);
      toast.success("Added to favourites!");
    } else {
      setFavourites((prev) => prev.filter((el) => el.id !== book.id));
      toast.warning("Removed from favourites!");
    }

    setIsFavourite(willBeFavourite);
  };

  const bookInfo: Partial<VolumeInfo> = book.volumeInfo;
  if (!bookInfo) return null;

  const shortDescription =
    book.searchInfo?.textSnippet ||
    bookInfo.description ||
    "No description available";

  return (
    <div className="book-item">
      {isFavourite && (
        <div className="book-item-favourite-icon">
          <FaHeart />
        </div>
      )}

      <Link to={`/book/${book.id}`} className="book-item-link">
        <div className="book-item-image-container">
          {bookInfo.imageLinks ? (
            <img
              src={bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail.replace("http://", "https://") : ""}
              alt={bookInfo.title}
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

        <div
          className="book-item-description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortDescription),
          }}
        />
      </Link>

      <div className="book-item-actions">
        <button
          className={`book-item-button like ${isFavourite ? "liked" : ""}`}
          onClick={handleClick}
        >
          {isFavourite ? (
            <>
              <FaHeart className="favourite-icon" />
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
}