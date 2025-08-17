import DOMPurify from "dompurify";

import styles from './styles.module.scss'

interface BookDescriptonProps {
    shortDescription: string;
};

export const BookDescripton = ({ shortDescription }: BookDescriptonProps) =>
(
    <div
        className={styles.bookItemDescription}
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortDescription),
        }}
    />
)
