import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { UTButton } from '@widergy/energy-ui';
import { InputAdornment } from '@material-ui/core';
import { func } from 'prop-types';
import i18 from 'i18next';

import { CONTACT_FORM, IDS, LABELS, PLACEHOLDERS } from 'constants/form';

import formTextField from '../FormTextField';
import styles from '../../styles.module.scss';

import { normalizeEmail, normalizeName, normalizePhone } from './utils';

const ContactUsForm = ({ handleSubmit }) => (
  <div>
    <form id={CONTACT_FORM} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <Field
          name={IDS.NAME}
          label={LABELS.NAME}
          placeholder={PLACEHOLDERS.NAME}
          component={formTextField}
          type="text"
          normalize={normalizeName}
        />
        <Field
          name={IDS.LAST_NAME}
          label={LABELS.LAST_NAME}
          placeholder={PLACEHOLDERS.LAST_NAME}
          component={formTextField}
          type="text"
          normalize={normalizeName}
        />
      </div>
      <div className={styles.inputRow}>
        <Field
          name={IDS.CELLPHONE}
          label={LABELS.CELLPHONE}
          placeholder={PLACEHOLDERS.CELLPHONE}
          component={formTextField}
          type="text"
          InputProps={{
            startAdornment: <InputAdornment position="start">{i18.t('Form:cellphonePrefix')}</InputAdornment>
          }}
          normalize={normalizePhone}
        />

        <Field
          name={IDS.EMAIL}
          label={LABELS.EMAIL}
          placeholder={PLACEHOLDERS.EMAIL}
          component={formTextField}
          normalize={normalizeEmail}
          type="email"
        />
      </div>
      <div className={styles.inputRow}>
        <Field name={IDS.OPINION} label={LABELS.OPINION} component={formTextField} type="text" multiline />
      </div>
      <div className={styles.inputRow}>
        <UTButton className={styles.submitButton} type="submit" form={CONTACT_FORM}>
          Submit
        </UTButton>
      </div>
    </form>
  </div>
);

ContactUsForm.propTypes = {
  handleSubmit: func
};

export default connect(state => ({
  initialValues: { name: state.userInformation.name, lastName: state.userInformation.lastName }
}))(
  reduxForm({
    form: CONTACT_FORM
  })(ContactUsForm)
);
