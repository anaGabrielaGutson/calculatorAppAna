import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTIconButton, UTLabel } from '@widergy/energy-ui';
import { string, number } from 'prop-types';

import { HOME } from 'constants/routes';
import ExpressionActions from 'redux/expressions/actions';

import { ReactComponent as DeleteElementIcon } from '../../../../assets/delete_icon.svg';
import { ReactComponent as EditIcon } from '../../../../assets/edit_icon.svg';

import styles from './styles.module.scss';

const Expression = ({ value, id, dispatch }) => {
  useEffect(() => {
    dispatch(ExpressionActions.fetchExpressions());
  }, []);

  const handlerEditElement = () => {
    dispatch(ExpressionActions.rewriteExpression(id, () => dispatch(push(HOME))));
    dispatch(push(HOME));
  };

  const handlerDeleteElement = () => {
    dispatch(ExpressionActions.deleteExpression(id));
    dispatch(ExpressionActions.fetchExpressions());
  };

  return (
    <div className={styles.expressionContainer}>
      <UTLabel className={styles.expression}>{value}</UTLabel>
      <div className={styles.expressionButtonsContainer}>
        <UTIconButton className={styles.deleteButton} onClick={handlerDeleteElement}>
          <DeleteElementIcon />
        </UTIconButton>
        <UTIconButton className={styles.editButton} onClick={handlerEditElement}>
          <EditIcon />
        </UTIconButton>
      </div>
    </div>
  );
};

Expression.propTypes = {
  value: string,
  id: number
};

export default connect()(Expression);
