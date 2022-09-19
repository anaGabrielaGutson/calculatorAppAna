const removeExtraSpaces = value => value.replace(/ +(?= )/g, '');

const removeNumbers = value => value.replace(/[^a-zA-Z /''/]/g, '');

const removeLetters = value => value.replace(/[^\d]/g, '');

export const normalizeName = value => removeExtraSpaces(removeNumbers(value));

export const normalizePhone = value => {
  const onlyNums = removeLetters(value);
  return onlyNums.length <= 4 ? onlyNums : `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}`;
};

export const normalizeEmail = value => value.replace(/\s/g, '');
