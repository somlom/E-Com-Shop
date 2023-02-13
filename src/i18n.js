import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from "i18next-http-backend" // <---- add this
import Backend from 'i18next-http-backend';

import DE from "./locales/de/translation.json";
import EN from "./locales/en/translation.json";
import ES from "./locales/es/translation.json";
import FR from "./locales/fr/translation.json";
import PL from "./locales/pl/translation.json";
import RO from "./locales/ro/translation.json";
import RU from "./locales/ru/translation.json";
import TR from "./locales/tr/translation.json";
import UA from "./locales/ua/translation.json";


const resources = {
  en: {
    translation: EN
  },
  de: {
    translation: DE
  },
  es: {
    translation: ES
  },
  fr: {
    translation: FR
  },
  ro: {
    translation: RO
  },
  ru: {
    translation: RU
  },
  ua: {
    translation: UA
  },
  pl: {
    translation: PL
  },
  tr: {
    translation: TR
  },
};

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}
i18n
  .use(Backend)
  .use(XHR) // <---- add this
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: options,
    resources,
    debug: true,
    fallbackLng: "en",
    // supportedLngs: ['de', 'en', 'fr'],
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // xss safe
    }
  });

export default i18n;
