import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      main_page: "Welcome to React and react-i18next",
      "nav test": "Test",
      modal_title: "Attention required",
      dont_have_an_account: "Don't have an account? Register!",
      faq: "FAQ",
      impressum: "Impressum",
      customer_rights: "Customer rights",
      support: "Support",
      password: "Password",
      password_again: "Password again",
      register: "Register",
      login: "Login",
      lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor veritatis molestiae et quidem aut? Repellat iure consectetur minima, rerum quaerat nemo esse laudantium, veniam repudiandae amet possimus nihil molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ab omnis sed. Voluptatem, voluptatibus repellendus enim, eligendi omnis sint, sed officiis cum earum perferendis nisi doloremque hic veritatis fuga reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, natus necessitatibus ex nemo tenetur reiciendis sapiente tempora recusandae harum, iure consectetur eius in cumque qui magni, nesciunt voluptatum porro dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ullam porro eos quasi nostrum. Unde maxime architecto eum incidunt corporis illo obcaecati. Iusto consectetur quam deserunt sequi corrupti, quae maiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium soluta atque id fuga iusto rem quidem vitae temporibus quos, quia debitis quo! Deserunt quibusdam dignissimos ipsa blanditiis cumque repellat voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis corporis dignissimos at eum aut adipisci suscipit repellendus facere iure, maiores unde libero incidunt natus doloribus provident numquam vel commodi. Ipsa!"
    }
  },
  fr: {
    translation: {
      main_page: "Bienvenue à React et react-i18next",
      "nav test": "Testé",
      modal_title: "Attention requise",
      support: "Support",
      faq: "FAQ",
      impressum: "Imprimer",
      customer_rights: "Droits des clients",
      dont_have_an_account: "Vous n'avez pas de compte ? S'inscrire!",
      password: "Mot de passe",
      password_again: "Mot de passe à nouveau",
      register: "Enregistrer",
      login: "Connexion",
      lorem: "L'entreprise elle-même est une entreprise très prospère. Notre douleur est la vérité de l'ennui et en effet ou? Il repousse les moindres conséquences de la loi, il ne cherche à être loué par personne, on peut facilement rejeter le pardon et aucun trouble. L'entreprise elle-même est une entreprise très prospère. Ils sont de tout le monde mais. Le plaisir, car être repoussé par les plaisirs, c'est être choisi par tous, mais en accomplissant des devoirs avec eux, à moins qu'il ne critique cette fuite de la vérité et de la douleur. L'entreprise elle-même est une entreprise très prospère. Des devoirs, nés de la nécessité, nul n'est lié par le sage rejet des temps de refus de ceux-ci. L'entreprise elle-même est une entreprise très prospère. Ils sont aussi travailleurs que les nôtres. C'est pourquoi la plupart des architectes tombent sur lui aveuglés par ce corps. Les justes seront suivis de ce que les corrompus, les anciens, ont laissé suivre ! Si le client est très intelligent, il pourra obtenir le résultat souhaité. Quand les accusateurs sont libérés et que la fuite n'est plus qu'une question de temps de la vie, car vous devez quoi ! Ils délaissent quelques-uns des plus méritants par la flatterie et repoussent avec plaisir. L'entreprise elle-même est une entreprise très prospère. Tolérant le plus digne du corps, mais pour l'obtenir ou pour le recevoir, il faut être repoussé par la loi, les anciens dont les nés libres tombent, ne pourvoient jamais aux peines ni aux bienfaits. Elle!"
    }
  },
  de: {
    translation: {
      main_page: "Willkommen zum react-i18next",
      "nav test": "Test",
      modal_title: "Aufmerksamkeit erforderlich",
      dont_have_an_account: "Sie haben kein Konto? Registrieren!",
      faq: "FAQ",
      impressum: "Impressum",
      customer_rights: "Kundenrechte",
      support: "Support",
      password: "Passwort",
      password_again: "Passwort wieder",
      register: "Registrieren",
      login: "Einloggen",
      lorem: "Das Unternehmen selbst ist ein sehr erfolgreiches Unternehmen. Unser Schmerz ist die Wahrheit des Ärgers und zwar oder? Er wehrt die kleinsten Folgen des Gesetzes ab, er will von niemandem gelobt werden, wir können die Begnadigung und keinen Ärger leicht ablehnen. Das Unternehmen selbst ist ein sehr erfolgreiches Unternehmen. Sie sind von allen, aber. Vergnügen, denn von Vergnügen abgestoßen zu werden, ist von allen zu wählen, aber durch die Erfüllung von Pflichten mit ihnen, es sei denn, er kritisiert diese Flucht von Wahrheit und Schmerz. Das Unternehmen selbst ist ein sehr erfolgreiches Unternehmen. An Pflichten, die aus der Not geboren sind, ist niemand durch die weise Ablehnung der Zeiten der Verweigerung dieser gebunden. Das Unternehmen selbst ist ein sehr erfolgreiches Unternehmen. Sie sind genauso fleißig wie wir. Deshalb fallen die meisten Architekten geblendet von diesem Körper über ihn her. Den Gerechten wird das folgen, was den Korrupten, den Ältesten, übrig bleibt! Wenn der Kunde sehr schlau ist, wird er oder sie in der Lage sein, das gewünschte Ergebnis zu erzielen. Wenn die Ankläger freigelassen werden und diese Flucht nur noch eine Frage der Lebenszeit ist, da schuldest du was! Sie verlassen einige der Verdientesten durch Schmeichelei und weisen sie mit Vergnügen zurück. Das Unternehmen selbst ist ein sehr erfolgreiches Unternehmen. Das Würdigste des Körpers zu tolerieren, aber um es zu erhalten oder zu empfangen, muss man vom Gesetz abgestoßen werden, die Ältesten, von denen die Freigeborenen abfallen, sorgen niemals für die Schmerzen oder Vorteile. Sie!"
    }
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: true,
    fallbackLng: "en",
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;