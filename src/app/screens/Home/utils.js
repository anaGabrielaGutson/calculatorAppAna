import { EMPTY_EXPONENT, EXPONENT, ERROR, MAX_SENTENCE_LENGTH, OPERATORS } from './constants';

const canAddDot = sentence => {
  const groups = sentence.split(/[+]|[-]|[x]|[÷]/);
  return !groups[groups.length - 1].includes(OPERATORS.DOT);
};

export const isDot = character => character === OPERATORS.DOT;

export const isKeyboardOperator = character =>
  [
    OPERATORS.ADDITION,
    OPERATORS.SUBTRACTION,
    OPERATORS.KEYBOARD_MULTIPLICATION,
    OPERATORS.KEYBOARD_DIVISION
  ].includes(character);

export const isNumber = character => character.match(/^[0-9]/);

export const isOperator = character => !isNumber(character) && !isDot(character);

export const isValidDot = (element, lastElement, actualValue) =>
  isDot(element) && canAddDot(actualValue) && isNumber(lastElement);

export const isValidNegative = (element, lastElement) =>
  element === OPERATORS.SUBTRACTION && [OPERATORS.MULTIPLICATION, OPERATORS.DIVISION].includes(lastElement);

export const isValidNewOperator = secondToLastValue => !isOperator(secondToLastValue);

export const isValidPositive = (element, lastElement, secondToLastElement) =>
  element === OPERATORS.ADDITION && lastElement === OPERATORS.SUBTRACTION && isOperator(secondToLastElement);

export const lastElementIsOperator = lastElement => isOperator(lastElement);

export const lastElementOfSentence = sentence => sentence.charAt(sentence.length - 1);

const isInScientificNotation = number => number.includes(OPERATORS.DOT) && number.includes(EXPONENT);

const adjustNumberLengthWhenInScientificNotation = expression => {
  const [number, exponent] = expression.split(EXPONENT);
  const [entero, decimalPart] = number.split(OPERATORS.DOT);
  const adjustedDecimalPart = decimalPart.slice(0, MAX_SENTENCE_LENGTH - entero.length - 2 - exponent.length);
  return `${entero + OPERATORS.DOT + adjustedDecimalPart + EXPONENT + exponent}`;
};

const roundResult = originalResult => {
  const result = parseFloat(originalResult);
  let resultAsText = result.toString();

  if (!resultAsText.includes(EXPONENT) && resultAsText.length >= MAX_SENTENCE_LENGTH)
    resultAsText = result.toExponential().toString();
  if (isInScientificNotation(resultAsText))
    resultAsText = adjustNumberLengthWhenInScientificNotation(resultAsText);
  if (resultAsText.includes(EXPONENT) && resultAsText.slice(-3) === EMPTY_EXPONENT) {
    [resultAsText] = resultAsText.split(EXPONENT);
    resultAsText += originalResult.slice(MAX_SENTENCE_LENGTH - 4, MAX_SENTENCE_LENGTH - 1);
  }
  return resultAsText;
};

export const secondToLastElementOfSentence = sentence => sentence.charAt(sentence.length - 2);

export const calculateResult = expression => {
  // eslint-disable-next-line no-eval
  const result = eval(expression);
  // eslint-disable-next-line no-restricted-globals
  return isFinite(result) ? roundResult(result.toString()) : ERROR;
};

export const transformToCalculatorDisplay = value =>
  value
    .replaceAll(OPERATORS.KEYBOARD_DIVISION, OPERATORS.DIVISION)
    .replaceAll(OPERATORS.KEYBOARD_MULTIPLICATION, OPERATORS.MULTIPLICATION);

export const transformToKeyboardDisplay = value =>
  value
    .replaceAll(OPERATORS.DIVISION, OPERATORS.KEYBOARD_DIVISION)
    .replaceAll(OPERATORS.MULTIPLICATION, OPERATORS.KEYBOARD_MULTIPLICATION);
