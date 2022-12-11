import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from "i18next-http-backend" // <---- add this

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      reset: "reset",
      products: "Products",
      main_page: "Welcome to React and react-i18next",
      "nav test": "Test",
      modal_title: "Attention required",
      dont_have_an_account: "Don't have an account? Register!",
      faq: "FAQ",
      Impressum: "Impressum",
      customer_rights: "Customer rights",
      support: "Support",
      password: "Password",
      password_again: "Password again",
      register: "Register",
      login: "Login",
      lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor veritatis molestiae et quidem aut? Repellat iure consectetur minima, rerum quaerat nemo esse laudantium, veniam repudiandae amet possimus nihil molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ab omnis sed. Voluptatem, voluptatibus repellendus enim, eligendi omnis sint, sed officiis cum earum perferendis nisi doloremque hic veritatis fuga reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, natus necessitatibus ex nemo tenetur reiciendis sapiente tempora recusandae harum, iure consectetur eius in cumque qui magni, nesciunt voluptatum porro dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ullam porro eos quasi nostrum. Unde maxime architecto eum incidunt corporis illo obcaecati. Iusto consectetur quam deserunt sequi corrupti, quae maiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium soluta atque id fuga iusto rem quidem vitae temporibus quos, quia debitis quo! Deserunt quibusdam dignissimos ipsa blanditiis cumque repellat voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis corporis dignissimos at eum aut adipisci suscipit repellendus facere iure, maiores unde libero incidunt natus doloribus provident numquam vel commodi. Ipsa!",
      "§5TMG": "Information according to § 5 TMG:",
      Contact: "Contact:",
      Telefone: "Phone:",
      "Email": "Email:",
      Disclaimer: `Disclaimer:

      Liability for content
      
      All content on our website was created with the greatest care and to the best of our knowledge. However, we cannot guarantee that the content is correct, complete or up-to-date. As a service provider, we are responsible for our own content on these pages according to Section 7, Paragraph 1 of the German Telemedia Act (TMG). According to §§ 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information according to general laws remain unaffected.
      
      However, liability in this regard is only possible from the point in time at which knowledge of a specific infringement of the law is obtained. As soon as we become aware of the above-mentioned violations of the law, we will remove this content immediately.
      
      Limitation of Liability for External Links
      
      Our website contains links to external third-party websites. We have no influence on the content of these directly or indirectly linked websites. For this reason, we cannot assume any liability for the correctness of the content of the "external links". The respective providers or operators (authors) of the pages are responsible for the content of the external links.
      
      The external links were checked for possible legal violations at the time the link was set and were free of illegal content at the time the link was set. A constant review of the content of the external links is not possible without concrete evidence of an infringement. In the case of direct or indirect links to third-party websites that are outside our area of ​​responsibility, liability would only exist if we became aware of the content and it was technically possible and reasonable for us to prevent use in the event of illegal content .
      
      This disclaimer of liability also applies to links and references set by questioners, blog posts and guests of the discussion forum on our own website "name of your domain". The service provider of the page to which reference was made is solely liable for illegal, incorrect or incomplete content and in particular for damage resulting from the use or non-use of such information, not the person who merely refers to the respective publication via links.
      
      If we become aware of any legal violations, we will remove the external links immediately.
      
      copyright
      
      The content and works published on our website are subject to German copyright law (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf). The duplication, processing, distribution and any kind of exploitation of the intellectual property from the intellectual and material point of view of the author outside the limits of copyright require the prior written consent of the respective author within the meaning of the Copyright Act (http://www.gesetze-im-internet.de /bundesrecht/urhg/gesamt.pdf ). Downloads and copies of this site are only permitted for private and non-commercial use. If the content on our website was not created by us, the copyrights of third parties must be observed. The contents of third parties are marked as such. Should you nevertheless become aware of a copyright infringement, we ask that you inform us accordingly. As soon as we become aware of legal violations, we will remove such content immediately.
      
      This imprint was kindly made available by jurarat.de.`
    }
  },
  fr: {
    translation: {
      products: "Products",
      reset: "reset",
      main_page: "Bienvenue à React et react-i18next",
      "nav test": "Testé",
      modal_title: "Attention requise",
      support: "Support",
      faq: "FAQ",
      customer_rights: "Droits des clients",
      dont_have_an_account: "Vous n'avez pas de compte ? S'inscrire!",
      password: "Mot de passe",
      password_again: "Mot de passe à nouveau",
      register: "Enregistrer",
      login: "Connexion",
      Impressum: "Imprimer",
      "§5TMG": "Informations selon § 5 TMG :",
      Contact: "Contactez:",
      Telefone: "Téléphoner:",
      "E-Mail": "E-Mail:",
      Disclaimer: `Avis de non-responsabilité - Avis de non-responsabilité :

      Responsabilité du contenu
      
      Tout le contenu de notre site Web a été créé avec le plus grand soin et au mieux de nos connaissances. Cependant, nous ne pouvons pas garantir que le contenu est correct, complet ou à jour. En tant que prestataire de services, nous sommes responsables de nos propres contenus sur ces pages conformément à l'article 7, paragraphe 1 de la loi allemande sur les télémédias (TMG). Conformément aux §§ 8 à 10 TMG, nous ne sommes toutefois pas tenus, en tant que prestataire de services, de surveiller les informations transmises ou stockées par des tiers ou d'enquêter sur les circonstances qui indiquent une activité illégale. Les obligations de supprimer ou de bloquer l'utilisation des informations conformément aux lois générales restent inchangées.
      
      Toutefois, la responsabilité à cet égard n'est possible qu'à partir du moment où la connaissance d'une violation concrète de la loi est obtenue. Dès que nous prendrons connaissance des violations de la loi susmentionnées, nous supprimerons immédiatement ce contenu.
      
      Limitation de responsabilité pour les liens externes
      
      Notre site Web contient des liens vers des sites Web tiers externes. Nous n'avons aucune influence sur le contenu de ces sites Web directement ou indirectement liés. Pour cette raison, nous ne pouvons assumer aucune responsabilité quant à l'exactitude du contenu des "liens externes". Les fournisseurs ou exploitants respectifs (auteurs) des pages sont responsables du contenu des liens externes.
      
      Les liens externes ont été vérifiés pour d'éventuelles violations de la loi au moment de la création du lien et étaient exempts de contenu illégal au moment de la création du lien. Un contrôle constant du contenu des liens externes n'est pas possible sans preuves concrètes d'une infraction. Dans le cas de liens directs ou indirects vers des sites Web tiers qui ne relèvent pas de notre domaine de responsabilité, la responsabilité n'existerait que si nous prenions connaissance du contenu et qu'il nous était techniquement possible et raisonnable d'empêcher l'utilisation en cas de contenu illégal.
      
      Cette clause de non-responsabilité s'applique également aux liens et références établis par les questionneurs, les articles de blog et les invités du forum de discussion sur notre propre site Web "nom de votre domaine". Le fournisseur de services de la page à laquelle il a été fait référence est seul responsable des contenus illégaux, incorrects ou incomplets et en particulier des dommages résultant de l'utilisation ou de la non-utilisation de ces informations, et non de la personne qui se contente de renvoyer à la publication respective via des liens. .
      
      Si nous prenons connaissance de violations légales, nous supprimerons immédiatement les liens externes.
      
      droits d'auteur
      
      Le contenu et les travaux publiés sur notre site Web sont soumis au droit d'auteur allemand (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf). La duplication, le traitement, la distribution et toute forme d'exploitation de la propriété intellectuelle du point de vue intellectuel et matériel de l'auteur en dehors des limites du droit d'auteur nécessitent le consentement écrit préalable de l'auteur respectif au sens de la loi sur le droit d'auteur (http: //www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf ). Les téléchargements et copies de ce site ne sont autorisés que pour un usage privé et non commercial. Si le contenu de notre site Web n'a pas été créé par nous, les droits d'auteur de tiers doivent être respectés. Les contenus de tiers sont signalés comme tels. Si vous avez néanmoins connaissance d'une violation du droit d'auteur, nous vous demandons de nous en informer en conséquence. Dès que nous aurons connaissance de violations légales, nous supprimerons immédiatement ce contenu.
      
      Cette mention a été gracieusement mise à disposition par jurarat.de.`
    }
  },
  de: {
    translation: {
      products: "Produkte",
      reset: "Wiedersetzen",
      main_page: "Willkommen zum react-i18next",
      "nav test": "Test",
      modal_title: "Aufmerksamkeit erforderlich",
      dont_have_an_account: "Sie haben kein Konto? Registrieren!",
      faq: "FAQ",
      customer_rights: "Kundenrechte",
      support: "Support",
      password: "Passwort",
      password_again: "Passwort wieder",
      register: "Registrieren",
      login: "Einloggen",
      Impressum: "Impressum",
      "§5TMG": "Angaben gem. § 5 TMG:",
      Contact: "Kontaktaufnahme:",
      Telefone: "Telefon:",
      "E-Mail": "E-Mail:",
      Disclaimer: `Haftungsausschluss – Disclaimer:

      Haftung für Inhalte
      
      Alle Inhalte unseres Internetauftritts wurden mit größter Sorgfalt und nach bestem Gewissen erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
      
      Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntniserlangung einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von den o.g. Rechtsverletzungen werden wir diese Inhalte unverzüglich entfernen.
      
      Haftungsbeschränkung für externe Links
      
      Unsere Webseite enthält Links auf externe Webseiten Dritter. Auf die Inhalte dieser direkt oder indirekt verlinkten Webseiten haben wir keinen Einfluss. Daher können wir für die „externen Links“ auch keine Gewähr auf Richtigkeit der Inhalte übernehmen. Für die Inhalte der externen Links sind die jeweilige Anbieter oder Betreiber (Urheber) der Seiten verantwortlich.
      
      Die externen Links wurden zum Zeitpunkt der Linksetzung auf eventuelle Rechtsverstöße überprüft und waren im Zeitpunkt der Linksetzung frei von rechtswidrigen Inhalten. Eine ständige inhaltliche Überprüfung der externen Links ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht möglich. Bei direkten oder indirekten Verlinkungen auf die Webseiten Dritter, die außerhalb unseres Verantwortungsbereichs liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall nur bestehen, wenn wir von den Inhalten Kenntnis erlangen und es uns technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
      
      Diese Haftungsausschlusserklärung gilt auch innerhalb des eigenen Internetauftrittes „Name Ihrer Domain“ gesetzten Links und Verweise von Fragestellern, Blogeinträgern, Gästen des Diskussionsforums. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargestellten Informationen entstehen, haftet allein der Diensteanbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
      
      Werden uns Rechtsverletzungen bekannt, werden die externen Links durch uns unverzüglich entfernt.
      
      Urheberrecht
      
      Die auf unserer Webseite veröffentlichen Inhalte und Werke unterliegen dem deutschen Urheberrecht (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf) . Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung des geistigen Eigentums in ideeller und materieller Sicht des Urhebers außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Urhebers i.S.d. Urhebergesetzes (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf ). Downloads und Kopien dieser Seite sind nur für den privaten und nicht kommerziellen Gebrauch erlaubt. Sind die Inhalte auf unserer Webseite nicht von uns erstellt wurden, sind die Urheberrechte Dritter zu beachten. Die Inhalte Dritter werden als solche kenntlich gemacht. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte unverzüglich entfernen.
      
      Dieses Impressum wurde freundlicherweise von jurarat.de zur Verfügung gestellt.`
    }
  }
};

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}
i18n
  .use(XHR) // <---- add this
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    detection: options,
    resources,
    // debug: true,
    fallbackLng: "en",
    // supportedLngs: ['de', 'en', 'fr'],
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
