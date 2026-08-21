import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationPT from "./locales/pt.json";
import translationEN from "./locales/en.json";
import translationDE from "./locales/de.json";

const resources = {
  pt: { translation: translationPT },
  en: { translation: translationEN },
  de: { translation: translationDE },
};

i18n
  .use(LanguageDetector) // Deteta a língua do browser
  .use(initReactI18next) // Liga ao React
  .init({
    resources,
    fallbackLng: "pt", // Língua padrão se falhar
    interpolation: {
      escapeValue: false, // Não é necessário para o React (protege contra XSS por padrão)
    },
  });

export default i18n;
