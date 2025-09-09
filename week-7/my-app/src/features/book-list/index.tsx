import { Book } from "@/types/books";
import Link from "next/link";
import styles from "./styles.module.css";
import { BookItem } from "@/components/book-item";

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
                    {books.map((book) => (
                        <li key={book.id} className={styles.item}>
                            <Link href={`/books/${book.id}`} className={styles.link}>
                                <BookItem
                                    book={book}
                                    isFavorite={isFavorite(book.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
