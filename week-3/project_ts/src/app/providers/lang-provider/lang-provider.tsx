import React, { PropsWithChildren, useEffect, useState } from 'react'

import { LangContext } from '@/shared/lib/contexts/lang-context'
import i18n from '@/shared/lib/i18n/i18n';
import { changeLang, getLang } from '@/shared/lib/utils/local-storage/language';
import { Language } from '@/shared/model/types/contexts';

export const LangProvider = ({children}: PropsWithChildren) => {
    const [lang, setLang] = useState<Language>(getLang());

    useEffect(() => {
        changeLang(lang)
    }, [lang])

    const toggleLang = (lng: Language) => {
        const newLang = lng === 'en' ? 'ru' : 'en'
        i18n.changeLanguage(newLang);
        setLang(newLang);
    }


    return (
        <LangContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LangContext.Provider>

    )
}
