import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from "@/shared/lib/i18n/locales/en/translation.json";
import ruTranslation from "@/shared/lib/i18n/locales/ru/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;