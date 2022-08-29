import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTButton } from '@widergy/energy-ui';

import styles from './styles.module.scss';
import Home from './layout.js';
import * as constants from './constants';
import {
  isDot,
  isKeyboardOperator,
  isNewOperator,
  isNumber,
  isOperator,
  isValidDotOrOperator,
  isValidNegative,
  isValidPositive
} from './utils';
import { useMutableState } from './hooks';

const HomeContainer = () => {
  const [actualDisplayRef, setDisplay] = useMutableState(constants.INICIAL);
  const [operationStateRef, setOperationState] = useMutableState(constants.SIN_REALIZAR);

  const replaceLastCharacter = element => setDisplay(actualDisplayRef.current.slice(0, -1) + element);
  const addCharacter = element => setDisplay(actualDisplayRef.current + element);
  const deleteLastCharacter = () => setDisplay(actualDisplayRef.current.slice(0, -1));

  const displayValue = element => {
    const lastElementDisplayed = actualDisplayRef.current.charAt(actualDisplayRef.current.length - 1);
    if (isDot(lastElementDisplayed) && isOperator(element)) replaceLastCharacter(element);

    if (operationStateRef.current === constants.SIN_REALIZAR && isNumber(element)) setDisplay(element);
    else if (actualDisplayRef.current === constants.INICIAL && isNumber(element)) setDisplay(element);
    else if (actualDisplayRef.current === constants.INICIAL && element === constants.SUBTRACTION)
      setDisplay(element);
    else if (actualDisplayRef.current === constants.INICIAL) addCharacter(element);
    else if (isValidNegative(element, lastElementDisplayed)) addCharacter(element);
    else if (
      isNewOperator(element, lastElementDisplayed) &&
      isValidPositive(element, actualDisplayRef.current)
    )
      deleteLastCharacter();
    else if (isNewOperator(element, lastElementDisplayed)) replaceLastCharacter(element);
    else if (
      isValidDotOrOperator(element, lastElementDisplayed, actualDisplayRef.current) ||
      isNumber(element)
    )
      addCharacter(element);

    setOperationState(constants.REALIZANDO);
  };

  const transformToKeyboardDisplay = value =>
    value
      .replace(constants.DIVISION, constants.KEYBOARD_DIVISION)
      .replace(constants.MULTIPLICATION, constants.KEYBOARD_MULTIPLICATION);

  const transformToCalculatorDisplay = value =>
    value
      .replace(constants.KEYBOARD_DIVISION, constants.DIVISION)
      .replace(constants.KEYBOARD_MULTIPLICATION, constants.MULTIPLICATION);

  const displayResult = () => {
    let result = transformToKeyboardDisplay(actualDisplayRef.current);
    const lastCharacter = result[result.length - 1];
    if (isOperator(lastCharacter) || isDot(lastCharacter)) result = result.slice(0, -1);
    // eslint-disable-next-line no-eval, no-restricted-globals
    if (isFinite(eval(result))) setDisplay(eval(result).toString());
    else {
      setDisplay(constants.ERROR);
      setTimeout(() => setDisplay(constants.INICIAL), constants.ERROR_LAPSE);
    }
    setOperationState(constants.SIN_REALIZAR);
  };

  const restartDisplay = () => {
    setOperationState(constants.SIN_REALIZAR);
    setDisplay(constants.INICIAL);
  };

  const clearAll = () => restartDisplay();

  const clearLast = () => {
    const newDisplay = actualDisplayRef.current.slice(0, -1);
    if (newDisplay.length) setDisplay(newDisplay);
    else restartDisplay();
  };

  // eslint-disable-next-line  
  const onKeyDown = e => {
    if (isNumber(e.key) || isKeyboardOperator(e.key) || e.key === constants.DOT)
    displayValue(transformToCalculatorDisplay(e.key));
    else if (e.key === constants.ENTER || e.key === constants.EQUAL) displayResult(e.key);
    else if (e.key === constants.KEYBOARD_CE) clearLast();
  };
  
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const buttonRenderer = obj => (
    <UTButton key={obj.value}
      className={`${styles.calculatorButton} ${obj.styles ? obj.styles : ''} 
        ${!obj.onPress ? styles.disabledButton : ''} `}
      onPress={() => obj.onPress?.(obj.value)}
    >
      {obj.value}
    </UTButton>
  );

  const sentenceToDisplay = sentence =>
    sentence.length > constants.MAX_SENTENCE_LENGTH
      ? sentence.slice(-constants.MAX_SENTENCE_LENGTH)
      : sentence;

  const valuesToMap = constants.BUTTONS(displayValue, displayResult, clearAll, clearLast);

  return (
    <Home
      valuesToMap={valuesToMap}
      sentenceToDisplay={sentenceToDisplay}
      actualDisplay={actualDisplayRef.current}
      buttonRenderer={buttonRenderer}
    />
  );
};

export default connect()(HomeContainer);
