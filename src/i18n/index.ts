import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Translations - Common
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// Translations - Guides
import spaceCenterEN from './locales/en/guides/spaceCenter.json';
import spaceCenterFR from './locales/fr/guides/spaceCenter.json';
import spaceCenterDataEN from './locales/en/guides/spaceCenterData.json';
import spaceCenterDataFR from './locales/fr/guides/spaceCenterData.json';

const resources = {
  en: {
    translation: translationEN,
    guides: {
      spaceCenter: spaceCenterEN,
      spaceCenterData: spaceCenterDataEN
    }
  },
  fr: {
    translation: translationFR,
    guides: {
      spaceCenter: spaceCenterFR,
      spaceCenterData: spaceCenterDataFR
    }
  },
};

i18n
  // Load translations from backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
