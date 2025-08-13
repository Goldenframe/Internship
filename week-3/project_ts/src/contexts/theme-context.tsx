import { createContext } from "react";

import { ContextTheme, Theme } from "@/types/contexts";

export const ThemeContext = createContext<ContextTheme>({
    toggleTheme: () => {},
});