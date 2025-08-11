import DOMPurify from 'dompurify';
import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchJSON } from '@/api/book-service';
import type { Book, VolumeInfo } from '@/types/books';

interface BookDetailsProps {
  favorites: Book[],
  setFavorites: React.Dispatch<React.SetStateAction<Book[]>>;
}

export function BookDetails({ favorites, setFavorites }: BookDetailsProps) {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === bookId)
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}${bookId}`

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const fetchPromise = fetchJSON<Book>(url, "Book not found")

        toast.promise(fetchPromise, {
          pending: "Loading book details...",
          success: "Book loaded successfully",
          error: {
            render({ data }: any) {
              return data.message || "Failed to load book details";
            },
          },
        });

        const data: Book = await fetchPromise;
        console.log(data)

        setBookDetails(data);
      } catch (err) {
      }
    };

    fetchBookDetails();
  }, [bookId, url]);

  if (!bookDetails) {
    return null;
  }

  const handleFavoriteClick = () => {
    const willBeFavorite = !isFavorite;
    if (willBeFavorite) {
      setFavorites((prev) => [...prev, bookDetails]);
      toast.success("Added to favorites");
    } else {
      setFavorites((prev) => prev.filter((el) => el.id !== bookDetails.id));
      toast.info("Removed from favorites");
    }
    setIsFavorite(willBeFavorite);
  };

  const book: Partial<VolumeInfo> = bookDetails.volumeInfo;

  return (
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
              <span>{book.publishedDate}</span>
            </div>
          )}

          {book.pageCount && (
            <div className="book-meta-item">
              <FaBookOpen />
              <span>{book.pageCount} pages</span>
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
          <div className="book-description">No description available.</div>
        )}

        <div className="book-actions">
          <button
            className={`action-button like-button ${isFavorite ? "liked" : ""
              }`}
            onClick={handleFavoriteClick}
          >
            <FaHeart className="favorite-icon" />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <button
            className="action-button back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}