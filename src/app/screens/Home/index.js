import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTButton, UTLabel } from '@widergy/energy-ui';
import i18 from 'i18next';

import { QUOTES } from 'constants/routes';

import styles from './styles.module.scss';

const Home = ({ dispatch }) => {
  const goToQuotes = useCallback(() => dispatch(push(QUOTES)), [dispatch]);

  return (
    <div className={styles.container}>
      <UTLabel large semibold>
        {i18.t('Home:title')}
      </UTLabel>
      <UTLabel className={styles.action}>{i18.t('Home:subtitle')}</UTLabel>
      <UTButton onPress={goToQuotes}>{i18.t('Home:button')}</UTButton>
    </div>
  );
};

export default connect()(Home);
