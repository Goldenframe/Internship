import DOMPurify from "dompurify";

import styles from './book-card.module.scss'

interface BookDescriptonProps {
    shortDescription: string;
};

export const BookDescripton = ({ shortDescription }: BookDescriptonProps) =>
(
    <div
        className={styles["book-item-description"]}
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortDescription),
        }}
    />
)
