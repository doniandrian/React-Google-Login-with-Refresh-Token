import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON bahasa
import en from "./locales/en.json";
import id from "./locales/id.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import pt from "./locales/pt.json";
import ru from "./locales/ru.json";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import ko from "./locales/ko.json";
import nl from "./locales/nl.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";
import th from "./locales/th.json";
import tr from "./locales/tr.json";
import sv from "./locales/sv.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  id: { translation: id },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
  ru: { translation: ru },
  ja: { translation: ja },
  zh: { translation: zh },
  ko: { translation: ko },
  nl: { translation: nl },
  ar: { translation: ar },
  hi: { translation: hi },
  th: { translation: th },
  tr: { translation: tr },
  sv: { translation: sv },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Bahasa default
  fallbackLng: "en", // Bahasa fallback
  interpolation: {
    escapeValue: false, // React melindungi dari XSS
  },
});

export default i18n;
