import React from 'react';
import 'scss/variables/_sizes.scss';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { UTButton, UTLabel } from '@widergy/energy-ui';
import i18 from 'i18next';

import logo from 'app/assets/logo.png';
import { CONTACT_US } from 'constants/routes';

import styles from './styles.module.scss';

const Topbar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <UTLabel className={styles.appName}>{i18.t('App:name')}</UTLabel>
      <div className={styles.brand}>
        <div className={styles.brandInfoContainer}>
          <UTLabel bold large black>
            {i18.t('App:brandName')}
          </UTLabel>
          <UTButton className={styles.contactUsButton} onPress={() => dispatch(push(CONTACT_US))}>
            {i18.t('App:contactText')}
          </UTButton>
        </div>
        <img alt="logo" src={logo} width={80} />
      </div>
    </div>
  );
};
export default Topbar;
