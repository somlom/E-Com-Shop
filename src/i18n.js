import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from "i18next-http-backend" // <---- add this
import Backend from 'i18next-http-backend';
// import translationEN from "./translations/en.json"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources =  {
  en: {
    translation: {
      Welcome: {
        "text": "Welcome to this React Internationalization App",
      },
      interpolation_pluralization: {
        "text_one": "There is only one Article on this",
        "text_other": "There are {{count}} Articles on this"
      }
    }
  },
  de: {
    translation: {
      Welcome: {
        "text": "Willkommen zur React Internationalization App",
      },
      interpolation_pluralization: {
        "text_one": "There is only one Article on this",
        "text_other": "There are {{count}} Articles on this"
      }
    }
  },
  fr: {
    translation: {
      Welcome: {
        "text": "Bienvenue sur cette application d'internationalisation React",
      },
      interpolation_pluralization: {
        "text_one": "Il n'y a qu'un seul article à ce sujet",
        "text_other": "Il y a {{count}} articles sur ce sujet"
      }
    }
  },
}

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}
i18n
  .use(XHR) // <---- add this
  .use(LanguageDetector)
    .use(Backend)
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
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
