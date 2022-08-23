import { FIELD_TEXT } from '@widergy/utilitygo-forms-web/dist/constants/fieldTypes';
import i18 from 'i18next';

export const charactersCount = {
  id: 1,
  type: FIELD_TEXT,
  key: 'count',
  title: i18.t('Quotes:count'),
  required: true
};
