import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { objectOf, string } from 'prop-types';
import { push } from 'connected-react-router';
import { UTIconButton, UTLabel } from '@widergy/energy-ui';
import i18 from 'i18next';

import UserInformationActions from 'redux/userInformation/actions';
import { HOME } from 'constants/routes';
import { CONTACT_FORM, IDS } from 'constants/form';

import { ReactComponent as BackPageIcon } from '../../assets/backpage_icon.svg';

import ContactUsForm from './components/ContactUsForm';
import styles from './styles.module.scss';

const ContactUs = ({ dispatch, fillValues }) => {
  const handleSubmit = ({ values }) => {
    dispatch(UserInformationActions.submitForm(values));
    dispatch(push(HOME));
  };

  const handleCancel = () => {
    dispatch(UserInformationActions.saveValues(fillValues[IDS.NAME], fillValues[IDS.LAST_NAME]));
    dispatch(push(HOME));
  };

  return (
    <div>
      <UTIconButton style={{ borderRadius: '10px', fontSize: '1.3rem' }} onClick={handleCancel}>
        <BackPageIcon /> {i18.t('ContactUs:goBack')}
      </UTIconButton>
      <UTLabel className={styles.titleText}>{i18.t('ContactUs:title')}</UTLabel>
      <div className={styles.formAndTextContainer}>
        <div className={styles.textContainer}>
          <UTLabel className={styles.text}>{i18.t('ContactUs:themText')}</UTLabel>
          <UTLabel className={styles.text}>{i18.t('ContactUs:usText')}</UTLabel>
          <UTLabel className={styles.text}>{i18.t('ContactUs:letsTalkText')}</UTLabel>
          <UTLabel className={styles.text}>{i18.t('ContactUs:informationText')}</UTLabel>
        </div>
        <div className={styles.formContainer}>
          <ContactUsForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

ContactUs.propTypes = {
  fillValues: objectOf(string)
};

const selector = formValueSelector(CONTACT_FORM); // <-- same as form name

const mapStateToProps = state => ({
  fillValues: selector(state, IDS.NAME, IDS.LAST_NAME, IDS.CELLPHONE, IDS.EMAIL, IDS.OPINION)
});

export default connect(mapStateToProps)(ContactUs);
