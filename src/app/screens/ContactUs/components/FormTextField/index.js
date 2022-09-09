import React from 'react';
import { TextField } from '@material-ui/core';
import { string, shape, func } from 'prop-types';

import { TEXT_FIELD_VARIANT } from 'constants/form';

import styles from '../../styles.module.scss';

const renderTextField = ({ name, label, placeholder, input, ...custom }) => (
  <TextField
    classes={{ root: styles.formField }}
    fullWidth
    id={name}
    label={label}
    placeholder={placeholder}
    required
    InputLabelProps={{ style: { fontSize: '0.9rem' } }}
    inputProps={{ style: { fontSize: '0.9rem', width: '15rem' } }} // font size of input text
    variant={TEXT_FIELD_VARIANT}
    {...custom}
    {...input}
  />
);

renderTextField.propTypes = {
  name: string,
  label: string,
  placeholder: string,
  input: shape({ name: string, onBlur: func, onChange: func, onDragStart: func, onDrop: func, onFocus: func })
};

export default renderTextField;
