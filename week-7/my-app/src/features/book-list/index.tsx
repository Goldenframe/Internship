import Link from 'next/link';

import { BookItem } from '@/components/book-item';
import { Book } from '@/types/books';

import styles from './styles.module.css';

interface BookListProps {
  books: Book[];
  toggleFavorite: (book: Book) => void;
  isFavorite: (bookId: string) => boolean;
  prefix?: string;
}

export default function BookList({ books, toggleFavorite, isFavorite, prefix = 'book' }: BookListProps) {
  const uniqueBooks = books.filter(
    (book, index, arr) => book.id && arr.findIndex(otherBook => otherBook.id === book.id) === index
  );

  return (
    <div className={styles.wrapper}>
      {uniqueBooks.length === 0 ? (
        <p className={styles.empty}>Нет книг</p>
      ) : (
        <ul className={styles.list}>
          {uniqueBooks.map((book, index) => (
            <li key={`${prefix}-${book.id ?? `${book.volumeInfo.title}-${index}`}`} className={styles.item}>
              <Link href={`/books/${book.id}`} className={styles.link}>
                <BookItem
                  book={book}
                  isFavorite={isFavorite(book.id)}
                  onToggleFavorite={toggleFavorite}
                  index={index}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
