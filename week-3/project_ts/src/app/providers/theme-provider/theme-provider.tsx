import React, { PropsWithChildren, useState, useEffect } from 'react'

import { ThemeContext } from '@/shared/lib/contexts/theme-context'
import { getTheme, changeTheme } from '@/shared/lib/utils/local-storage/theme'
import { Theme } from '@/shared/model/types/contexts';

export const ThemeProvider = ({ children }: PropsWithChildren) => {

    const [theme, setTheme] = useState<Theme>(getTheme());

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        changeTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }


    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
