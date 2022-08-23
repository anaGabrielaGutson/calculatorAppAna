import React, { PureComponent } from 'react';
import { UTLabel, UTButton } from '@widergy/energy-ui';
import { handleKeyDown } from '@widergy/utilitygo-forms-web';
import { reduxForm } from 'redux-form';
import { func, bool } from 'prop-types';
import i18 from 'i18next';

import UTForm from 'app/components/UTForm';

import { charactersCount } from './constants';
import styles from './styles.module.scss';

const fields = [charactersCount];

class Quotes extends PureComponent {
  render() {
    const { invalid, submitFailed, handleSubmit } = this.props;
    return (
      <form onKeyDown={handleKeyDown} onSubmit={handleSubmit} className={styles.form}>
        <UTLabel large semibold className={styles.formTitle}>
          {i18.t('Quotes:formContent')}
        </UTLabel>
        <UTForm fields={fields} />
        <UTButton disabled={invalid && submitFailed} text type="submit">
          {i18.t('Quotes:button')}
        </UTButton>
      </form>
    );
  }
}

Quotes.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitFailed: bool
};

export default reduxForm({ form: 'CHARACTERS_FORM' })(Quotes);
