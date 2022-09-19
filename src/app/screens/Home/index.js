import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTButton } from '@widergy/energy-ui';
import { number, arrayOf, shape, string } from 'prop-types';
import { useMutableState } from '@widergy/energy-hooks';

import ExpressionActions from 'redux/expressions/actions';

import styles from './styles.module.scss';
import Home from './layout.js';
import { BUTTONS, ERROR, MAX_SENTENCE_LENGTH, OPERATORS, STATE } from './constants';
import {
  adjustExpression,
  calculateResult,
  isDot,
  isKeyboardOperator,
  isNumber,
  isOperator,
  isValidDot,
  isValidNegative,
  isValidNewOperator,
  isValidPositive,
  lastElementIsOperator,
  lastElementOfSentence,
  secondToLastElementOfSentence,
  transformToCalculatorDisplay,
  transformToKeyboardDisplay
} from './utils';

const HomeContainer = ({ editIndex, expressions, dispatch }) => {
  const [actualDisplayRef, setDisplay] = useMutableState(STATE.INICIAL);

  useEffect(() => {
    if (editIndex !== null) {
      const [expressionToEdit] = expressions.filter(({ id }) => id === editIndex);
      setDisplay(expressionToEdit.value.split(OPERATORS.EQUAL)[0].trim());
    }
  }, [editIndex]);

  const addCharacter = element => setDisplay(actualDisplayRef.current + element);
  const deleteLastCharacter = () => setDisplay(actualDisplayRef.current.slice(0, -1));
  const replaceLastCharacter = element => setDisplay(actualDisplayRef.current.slice(0, -1) + element);
  const replaceOperators = element => setDisplay(actualDisplayRef.current.slice(0, -2) + element);

  const executeActionWhenInitialState = element =>
    isNumber(element) || element === OPERATORS.SUBTRACTION ? setDisplay(element) : addCharacter(element);

  const executeActionIfPossibleWhenLastElementIsOperator = (element, lastElement, secondToLastElement) => {
    if (isValidNegative(element, lastElement)) addCharacter(element);
    else if (isValidNewOperator(secondToLastElement)) replaceLastCharacter(element);
    else if (isValidPositive(element, lastElement, secondToLastElement)) deleteLastCharacter();
    else if (lastElement === OPERATORS.SUBTRACTION) replaceOperators(element);
  };

  const executeActionWhenElementIsOperator = (element, lastElement, secondToLastElement) =>
    lastElementIsOperator(lastElement)
      ? executeActionIfPossibleWhenLastElementIsOperator(element, lastElement, secondToLastElement)
      : addCharacter(element);

  const lastTwoElementsDisplayed = () => [
    lastElementOfSentence(actualDisplayRef.current),
    secondToLastElementOfSentence(actualDisplayRef.current)
  ];

  const displayValue = newElement => {
    let [lastElement, secondToLastElement] = lastTwoElementsDisplayed();

    if (actualDisplayRef.current === ERROR) setDisplay(STATE.INICIAL);
    if (isDot(lastElement) && isOperator(newElement)) {
      deleteLastCharacter();
      [lastElement, secondToLastElement] = lastTwoElementsDisplayed();
    }

    if (actualDisplayRef.current === STATE.INICIAL) executeActionWhenInitialState(newElement);
    else if (isOperator(newElement))
      executeActionWhenElementIsOperator(newElement, lastElement, secondToLastElement);
    else if (isValidDot(newElement, lastElement, actualDisplayRef.current) || isNumber(newElement))
      addCharacter(newElement);
  };

  const saveExpression = (expression, result) => {
    const expressionToSave = `${expression} ${OPERATORS.EQUAL} ${result}`;
    if (editIndex === null) dispatch(ExpressionActions.addExpression(expressionToSave));
    else dispatch(ExpressionActions.editExpression(editIndex, expressionToSave));
  };

  const displayResult = () => {
    const expression = actualDisplayRef.current;
    let keyboardExpression = transformToKeyboardDisplay(expression);
    const lastCharacter = lastElementOfSentence(keyboardExpression);

    if (isOperator(lastCharacter) || isDot(lastCharacter))
      keyboardExpression = keyboardExpression.slice(0, -1);

    const result = calculateResult(keyboardExpression);
    setDisplay(result);

    saveExpression(adjustExpression(expression), result);
  };

  const restartDisplay = () => {
    setDisplay(STATE.INICIAL);
  };

  const clearAll = () => restartDisplay();

  const clearLast = () => {
    const newDisplay = actualDisplayRef.current.slice(0, -1);
    if (newDisplay.length) setDisplay(newDisplay);
    else restartDisplay();
  };

  // eslint-disable-next-line
  const onKeyDown = e => {
    if (isNumber(e.key) || isKeyboardOperator(e.key) || e.key === OPERATORS.DOT)
      displayValue(transformToCalculatorDisplay(e.key));
    else if (e.key === OPERATORS.ENTER || e.key === OPERATORS.EQUAL) displayResult(e.key);
    else if (e.key === OPERATORS.KEYBOARD_CE) clearLast();
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const buttonRenderer = obj => (
    <UTButton
      key={obj.value}
      className={`${styles.calculatorButton} ${obj.styles ? obj.styles : ''} 
        ${!obj.onPress ? styles.disabledButton : ''} `}
      onPress={() => obj.onPress?.(obj.value)}
    >
      {obj.value}
    </UTButton>
  );

  const sentenceToDisplay = sentence =>
    sentence.length > MAX_SENTENCE_LENGTH ? sentence.slice(-MAX_SENTENCE_LENGTH) : sentence;

  const valuesToMap = BUTTONS(clearAll, clearLast, displayResult, displayValue);

  return (
    <Home
      valuesToMap={valuesToMap}
      sentenceToDisplay={sentenceToDisplay}
      actualDisplay={actualDisplayRef.current}
      buttonRenderer={buttonRenderer}
    />
  );
};

HomeContainer.propTypes = {
  expressions: arrayOf(shape({ value: string, index: number })),
  editIndex: number
};

const mapStateToProps = state => ({
  editIndex: state.expressions.editIndex,
  expressions: state.expressions.expressions
});

export default connect(mapStateToProps)(HomeContainer);
