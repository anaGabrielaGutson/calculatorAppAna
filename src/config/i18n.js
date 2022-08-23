import i18 from 'i18next';

import someCustomer from 'config/someCustomer/texts';

const texts = {
  someCustomer
};

i18.init({
  lng: 'es',
  initImmediate: false,
  resources: texts.someCustomer
});
