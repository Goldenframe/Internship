import { createContext } from "react";

import { ContextLang } from "@/shared/model/types/contexts";

export const LangContext = createContext<ContextLang>({
    lang: 'en',
    toggleLang: () => {}
});