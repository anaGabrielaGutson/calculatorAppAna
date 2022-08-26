import styles from './styles.module.scss';

export const ADDITION = '+';
export const KEYBOARD_CE = 'Backspace';
export const DIVISION = '÷';
export const DOT = '.';
export const ENTER = 'Enter';
export const EQUAL = '=';
export const ERROR = 'Syntax Error';
export const ERROR_LAPSE = 500;
export const INICIAL = '0';
export const MAX_SENTENCE_LENGTH = 14;
export const MULTIPLICATION = 'x';
export const REALIZANDO = 1;
export const SIN_REALIZAR = 0;
export const SUBTRACTION = '-';
export const KEYBOARD_DIVISION = '/';
export const KEYBOARD_MULTIPLICATION = '*';

export const BUTTONS = (displayValue, displayResult, clearAll, clearLast) => [
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
  { value: '=', onPress: displayResult, styles: styles.calculatorSpecialButtonn },
  { value: ADDITION, onPress: displayValue, styles: styles.calculatorSumButton }
];
