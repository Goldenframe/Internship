import { Language } from "@/shared/model/types/contexts";

import { STORAGE_KEY } from "./constants";

const isLang = (str: string): str is Language => {
    return (
        typeof str === "string" &&
        (str === 'ru' || str === 'en')
    );
}

export const changeLang = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY.LANG, lang);
}

export const getLang = (): Language => {
    const lang = localStorage.getItem(STORAGE_KEY.LANG);

    if (lang && isLang(lang)) {
        return lang
    }
    return "en"
}
