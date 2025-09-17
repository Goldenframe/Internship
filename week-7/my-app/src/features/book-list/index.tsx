import Link from 'next/link';

import { BookItem } from '@/components/book-item';
import { Book } from '@/types/books';

import styles from './styles.module.css';

interface BookListProps {
  books: Book[];
  toggleFavorite: (book: Book) => void;
  isFavorite: (bookId: string) => boolean;
}

export default function BookList({ books, toggleFavorite, isFavorite }: BookListProps) {
  return (
    <div className={styles.wrapper}>
      {books.length === 0 ? (
        <p className={styles.empty}>Нет книг</p>
      ) : (
        <ul className={styles.list}>
          {books.map((book, index) => (
            <li key={book.id ?? `${book.volumeInfo.title}-${index}`} className={styles.item}>
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
