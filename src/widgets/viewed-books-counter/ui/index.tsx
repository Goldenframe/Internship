import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next';

import { model } from "@/entities/book-card/model/book-model";

import styles from './styles.module.scss'


export const ViewedBooksCounter = () => {
    const { t } = useTranslation();

    const [viewBooks] = useUnit([model.$viewedBooks])

    return (
        <div className={styles.bookViews}>
            <span className={styles.bookViewsText}>
                {viewBooks.length} {t("common.booksViewed")}
            </span>
        </div>
    )
}
