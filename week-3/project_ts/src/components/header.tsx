import React, { useContext } from 'react'
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LangContext } from '@/contexts/lang-context';
import { ThemeContext } from '@/contexts/theme-context';

interface HeaderProps {
    isLogging: boolean,
    setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ isLogging, setIsLogging }: HeaderProps) => {
    const { t } = useTranslation();

    const { toggleTheme } = useContext(ThemeContext);
    const { lang, toggleLang } = useContext(LangContext);

    return (
        <nav>
            <button onClick={() => { toggleLang(lang) }}>{t("header.changeLanguage")}</button>
            <Link to={'/'}>{t("header.home")}</Link>
            <Link to={'/favorites'}>{t("header.favorites")}</Link>
            <label>
                <input
                    type="checkbox"
                    checked={isLogging}
                    onChange={(e) => setIsLogging(e.target.checked)}
                />
                {!isLogging ? `${t("header.showEffectLogger")}` : `${t("header.hideEffectLogger")}`}
            </label>
        </nav>
    )
}
