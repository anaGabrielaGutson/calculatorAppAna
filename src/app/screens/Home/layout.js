import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { UTLabel } from '@widergy/energy-ui';
import i18 from 'i18next';

import styles from './styles.module.scss';

const Home = ({ valuesToMap, sentenceToDisplay, actualDisplay, buttonRenderer }) => (
  <div className={styles.calculatorContainer}>
    <div className={styles.calculatorDisplayBox}>
      <div className={styles.calculatorTopBar}>
        <UTLabel bold>{i18.t('Calculator:name')}</UTLabel>
        <div className={styles.calculatorSolarPower} />
      </div>
      <div className={styles.calculatorResult}>{sentenceToDisplay(actualDisplay)}</div>
    </div>
    <div className={styles.calculatorButtons}>{valuesToMap.map(obj => buttonRenderer(obj))}</div>
  </div>
);

Home.propTypes = {
  valuesToMap: arrayOf(shape({ value: string, onPress: func, styles: string })),
  sentenceToDisplay: func,
  actualDisplay: string,
  buttonRenderer: func
};
export default Home;
