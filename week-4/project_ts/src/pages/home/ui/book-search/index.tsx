import { useUnit } from 'effector-react';
import { useTranslation } from "react-i18next";

import { model } from "@/entities/book-card/model/book-model";

export const SearchForm = () => {
    const { t } = useTranslation();

    const [ searchInput, searchFormSubmitted, searchInputUpdated] = useUnit([
        model.$searchInput,
        model.searchFormSubmitted,
        model.searchInputUpdated,
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchFormSubmitted();
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