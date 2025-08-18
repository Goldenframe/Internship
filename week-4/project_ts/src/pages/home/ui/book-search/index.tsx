import { useUnit } from 'effector-react';
import { useTranslation } from "react-i18next";
import { $query, $searchInput, SearchFormSubmitted, searchInputUpdated, fetchBooksFx } from '@/shared/lib/effector/book-model';

export const SearchForm = () => {
    const { t } = useTranslation();

    const [query, searchInput] = useUnit([
        $query,
        $searchInput
        ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        SearchFormSubmitted();
        fetchBooksFx({ query, startIndex: 0, t });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="visually-hidden">
                {t("search.placeholder")}
            </label>
            <input
                id="search-input"
                type="search"
                value={searchInput}
                onChange={(e) => searchInputUpdated(e.target.value)}
                placeholder={t("search.placeholder")}
            />
            <button type="submit">{t("common.search")}</button>
        </form>
    );
};