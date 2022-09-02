import styles from './styles.module.scss';

const ADDITION = '+';
const DIVISION = '÷';
const DOT = '.';
const ENTER = 'Enter';
const INICIAL = '0';
const KEYBOARD_CE = 'Backspace';
const KEYBOARD_DIVISION = '/';
const KEYBOARD_MULTIPLICATION = '*';
const MULTIPLICATION = 'x';
const REALIZANDO = 1;
const SIN_REALIZAR = 0;
const SUBTRACTION = '-';
export const EMPTY_EXPONENT = 'e+0';
export const EQUAL = '=';
export const ERROR = 'Syntax Error';
export const ERROR_LAPSE = 1000;
export const EXPONENT = 'e';
export const MAX_SENTENCE_LENGTH = 13;
export const OPERATORS = {
  ADDITION,
  DIVISION,
  DOT,
  ENTER,
  EQUAL,
  KEYBOARD_CE,
  KEYBOARD_DIVISION,
  KEYBOARD_MULTIPLICATION,
  MULTIPLICATION,
  SUBTRACTION
};

export const STATE = {
  INICIAL,
  REALIZANDO,
  SIN_REALIZAR
};

export const BUTTONS = (clearAll, clearLast, displayResult, displayValue) => [
  { value: 'ON/C', onPress: clearAll, styles: styles.calculatorOnButton },
  { value: 'MC \nMR', styles: styles.calculatorSpecialButton },
  { value: 'M-', styles: styles.calculatorSpecialButton },
  { value: 'M+', styles: styles.calculatorSpecialButton },
  { value: DIVISION, onPress: displayValue, styles: styles.calculatorOperationButton },
  { value: '+/-', styles: styles.calculatorSpecialButton },
  { value: '7', onPress: displayValue },
  { value: '8', onPress: displayValue },
  { value: '9', onPress: displayValue },
  { value: MULTIPLICATION, onPress: displayValue, styles: styles.calculatorOperationButton },
  { value: '%', styles: styles.calculatorSpecialButton },
  { value: '4', onPress: displayValue },
  { value: '5', onPress: displayValue },
  { value: '6', onPress: displayValue },
  { value: SUBTRACTION, onPress: displayValue, styles: styles.calculatorOperationButton },
  { value: '√', styles: styles.calculatorSpecialButton },
  { value: '1', onPress: displayValue },
  { value: '2', onPress: displayValue },
  { value: '3', onPress: displayValue },
  { value: 'CE', onPress: clearLast, styles: styles.calculatorSpecialButton },
  { value: '0', onPress: displayValue },
  { value: DOT, onPress: displayValue },
  { value: EQUAL, onPress: displayResult, styles: styles.calculatorSpecialButtonn },
  { value: ADDITION, onPress: displayValue, styles: styles.calculatorSumButton }
];
