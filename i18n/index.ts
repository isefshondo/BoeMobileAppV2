import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';

const resources = {
  "en-US": {translation: en},
  "en-GB": {translation: en},
};

const initI18n = () => {
  const deviceLanguage = Localization.locale;
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: deviceLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;