import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { UTIconButton, UTLabel, UTTooltip } from '@widergy/energy-ui';
import i18 from 'i18next';

import { RECORD } from 'constants/routes';

import { ReactComponent as Icon } from '../../assets/record_icon.svg';

import styles from './styles.module.scss';

const Home = ({ valuesToMap, sentenceToDisplay, actualDisplay, buttonRenderer }) => {
  const dispatch = useDispatch();

  const goToRecordButtonTippyProps = () => ({
    placement: 'top',
    interactive: false,
    arrow: false,
    boundary: 'viewport',
    appendTo: document.body
  });

  const goToRecordButtonRenderer = () => (
    <UTTooltip
      content={<span>{i18.t('Calculator:recordButton')}</span>}
      tippyProps={goToRecordButtonTippyProps()}
    >
      <span className={styles.recordButtonContainer}>
        <UTIconButton className={styles.calculatorRecordButton} onClick={() => dispatch(push(RECORD))}>
          <Icon />
        </UTIconButton>
      </span>
    </UTTooltip>
  );

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorDisplayBox}>
        <div className={styles.calculatorTopBar}>
          <UTLabel bold>{i18.t('Calculator:name')}</UTLabel>
          <div className={styles.calculatorSolarPower} />
        </div>
        <div className={styles.calculatorResultBox}>
          {goToRecordButtonRenderer()}
          <div className={styles.calculatorResultDisplay}>{sentenceToDisplay(actualDisplay)}</div>
        </div>
      </div>
      <div className={styles.calculatorButtons}>{valuesToMap.map(obj => buttonRenderer(obj))}</div>
    </div>
  );
};

Home.propTypes = {
  valuesToMap: arrayOf(shape({ value: string, onPress: func, styles: string })),
  sentenceToDisplay: func,
  actualDisplay: string,
  buttonRenderer: func
};
export default Home;
