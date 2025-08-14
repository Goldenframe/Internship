import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/shared/lib/contexts/theme-context';

import styles from './portal-dropdown.module.scss'

interface PortalDropdownProps {
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    setStartIndex: React.Dispatch<React.SetStateAction<number>>,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>

}

export const PortalDropdown = ({ filter, setFilter, setStartIndex, setHasMore }: PortalDropdownProps) => {

    const { t } = useTranslation();

    const { toggleTheme } = useContext(ThemeContext);

    const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setStartIndex(0);
        setHasMore(true);
        setFilter(e.target.value);
    }, [setHasMore, setFilter, setStartIndex]);

    return (
        <div className={styles["dropdown-container"]}>
            <div className={styles["dropdown-wrapper"]}>
                <select
                    id="book-filter"
                    value={filter}
                    onChange={handleSelect}
                    title={t("search.filter.title")}
                    className={styles["dropdown-select"]}
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
                className={styles["theme-toggle-button"]}
                aria-label={t("header.changeTheme")}
            >
                {t("header.changeTheme")}
            </button>
        </div>
    )
}

