import { createContext } from "react";

import { ContextTheme } from "@/shared/model/types/contexts";

export const ThemeContext = createContext<ContextTheme>({
    toggleTheme: () => {},
});