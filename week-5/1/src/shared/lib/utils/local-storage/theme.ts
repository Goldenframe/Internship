import { Theme } from "@/shared/model/types/contexts";

import { STORAGE_KEY } from "./constants";

const isTheme = (str: string): str is Theme => {
    return (
        typeof str === "string" &&
        (str === 'light' || str === 'dark')
    );
}

export const getTheme = (): Theme => {
    const theme = localStorage.getItem(STORAGE_KEY.THEME);

    if (theme && isTheme(theme)) {
        return theme
    }
    return "light"
}

export const changeTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY.THEME, theme);
}