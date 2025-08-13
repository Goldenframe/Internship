import { createContext } from "react";

import { ContextLang, Language } from "@/types/contexts";

export const LangContext = createContext<ContextLang>({
    lang: 'en',
    toggleLang: () => {}
});