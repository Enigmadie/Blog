import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      blank: 'Can\'t be blank',
      minSizeCategory: 'Pick at least 1 category',
      maxSizeCategory: 'Pick no more than 3 categories',
      network: 'You\'r device lost it\'s internet connection. \n You can try reloading the page',
      server: 'Server error at the moment',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    debug: true,
    resources,
    react: {
      wait: true,
    },
  });

export default i18n;
