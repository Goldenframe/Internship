import { useTranslation } from "react-i18next";

interface SearchFormProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (e: React.FormEvent) => void;
}

export const SearchForm = ({
    searchInput,
    setSearchInput,
    handleSubmit
}: SearchFormProps) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="visually-hidden">
                {t("search.placeholder")}
            </label>
            <input
                id="search-input"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t("search.placeholder")}
            />
            <button type="submit">{t("common.search")}</button>
        </form>
    );
};