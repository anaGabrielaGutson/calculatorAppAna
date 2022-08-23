import i18 from 'i18next';
import { UTTextInput, UTLabel } from '@widergy/energy-ui';
import { FIELD_TEXT, FIELD_LABEL } from '@widergy/utilitygo-forms-web/dist/constants/fieldTypes';

export const DefaultMessages = {
  required: i18.t('Quotes:required'),
  invalidFormat: i18.t('Quotes:invalidFormat')
};
export const Components = {
  [FIELD_LABEL]: UTLabel,
  [FIELD_TEXT]: UTTextInput
};
