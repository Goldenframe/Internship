import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';

import { ThemeContext } from '@/shared/lib/contexts/theme';
import { model } from "@/entities/book-card/model/book-model";

import styles from './styles.module.scss'

export const PortalDropdown = () => {
    const { t } = useTranslation();

    const [filter, resetPagination, filterUpdated] = useUnit([model.$filter, model.resetPagination, model.filterUpdated]);
    const { toggleTheme } = useContext(ThemeContext);

    const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        resetPagination();
        filterUpdated(e.target.value);
    }, []);

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownWrapper}>
                <select
                    id="book-filter"
                    value={filter}
                    onChange={handleSelect}
                    title={t("search.filter.title")}
                    className={styles.dropdownSelect}
                >
                    <option value="">{t("search.filter.all")}</option>
                    <option value="ebooks">{t("search.filter.ebooks")}</option>
                    <option value="free-ebooks">{t("search.filter.freeEbooks")}</option>
                    <option value="full">{t("search.filter.full")}</option>
                    <option value="paid-ebooks">{t("search.filter.paidEbooks")}</option>
                    <option value="partial">{t("search.filter.partial")}</option>
                </select>
            </div>
            <button
                type="button"
                onClick={toggleTheme}
                className={styles.themeToggleButton}
                aria-label={t("header.changeTheme")}
            >
                {t("header.changeTheme")}
            </button>
        </div>
    )
}