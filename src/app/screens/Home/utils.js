import * as constants from './constants';

export const canAddDot = sentence => {
  const groups = sentence.split(/[+]|[-]|[x]|[÷]/);
  return !groups[groups.length - 1].includes(constants.DOT);
};

export const isDot = character => character === '.';

export const isKeyboardOperator = character =>
  character === constants.ADDITION ||
  character === constants.SUBTRACTION ||
  character === constants.KEYBOARD_MULTIPLICATION ||
  character === constants.KEYBOARD_DIVISION;

export const isNumber = character => character.match(/^[0-9]/);

export const isOperator = character => !isNumber(character) && !isDot(character);

export const isNewOperator = (element, lastElementDisplayed) =>
  isOperator(element) && isOperator(lastElementDisplayed);

export const isValidDotOrOperator = (element, lastElementDisplayed, actualValue) =>
  (isOperator(element) || (isDot(element) && canAddDot(actualValue))) && isNumber(lastElementDisplayed);

export const isValidNegative = (element, lastElementDisplayed) =>
  element === constants.SUBTRACTION &&
  (lastElementDisplayed === constants.MULTIPLICATION || lastElementDisplayed === constants.DIVISION);

export const isValidPositive = (element, actualDisplay) => {
  const lastElementDisplayed = actualDisplay.charAt(actualDisplay.length - 1);
  const secondToLastElementDisplayed = actualDisplay.charAt(actualDisplay.length - 2);

  return (
    element === constants.ADDITION &&
    lastElementDisplayed === constants.SUBTRACTION &&
    isOperator(secondToLastElementDisplayed)
  );
};
