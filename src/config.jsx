import en from './locales/en';
import fr from './locales/fr';

export default {
  analytics: {
    UA: 'UA-XXXXX-X',
  },

  render: {
    port: {
      public: 80,
      private: 80,
    },
    host: 'localhost',
    protocol: 'http',
  },

  intl: {
    en,
    'en-US': en,
    fr,
    'fr-FR': fr,
  },

  INT_MAX: 9007199254740992,
  DEFAULT_CLIENT_ID: 'DefaultClientId',
  APP_ROOT_ID: 'ReactNexusTwitchMonitor',
};
