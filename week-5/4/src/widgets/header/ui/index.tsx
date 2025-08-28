import { useUnit } from 'effector-react';
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { model } from '@/entities/book-card/model/book-model';
import { LangContext } from '@/shared/lib/contexts/lang';

import './styles.module.scss'


interface HeaderProps {
    isLogging: boolean,
    setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ isLogging, setIsLogging }: HeaderProps) => {
    const { t } = useTranslation();

    const { lang, toggleLang } = useContext(LangContext);
    const [viewBooks] = useUnit([model.$viewedBooks])

    return (
        <nav>
            <button type='button' onClick={() => { toggleLang(lang) }}>{t("header.changeLanguage")}</button>
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
            {viewBooks.length} {t("common.booksViewed")}
        </nav>
    )
}
