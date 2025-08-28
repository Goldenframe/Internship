export type Theme = 'light' | 'dark';
export type Language = 'ru' | 'en';

export interface ContextTheme {
    toggleTheme: () => void
}

export interface ContextLang {
    lang: Language,
    toggleLang: (lng: Language) => void
}