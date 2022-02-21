import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import translationEN from './en.json';
import detector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
