import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      blank: 'Can\'t be blank',
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
    fallbacklng: false,
    react: {
      wait: true,
    },
  });

export default i18n;
