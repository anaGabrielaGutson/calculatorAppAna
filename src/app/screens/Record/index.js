import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTIconButton, UTLabel } from '@widergy/energy-ui';
import { arrayOf, shape, string, number } from 'prop-types';
import { isEmpty } from '@widergy/web-utils/lib/array';
import i18 from 'i18next';

import { HOME } from 'constants/routes';
import ExpressionActions from 'redux/expressions/actions';

import { ReactComponent as DeleteElementIcon } from '../../assets/delete_icon.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash_icon.svg';
import { ReactComponent as EditIcon } from '../../assets/edit_icon.svg';
import { ReactComponent as BackPageIcon } from '../../assets/backpage_icon.svg';

import styles from './styles.module.scss';

const Record = ({ expressions, dispatch }) => {
  const removeAllExpressionsButtonRenderer = () => (
    <UTIconButton
      className={styles.deleteAllButton}
      onClick={() => dispatch(ExpressionActions.removeAllExpressions())}
    >
      <TrashIcon />
    </UTIconButton>
  );

  const goBackToCalculatorButtonRenderer = () => (
    <UTIconButton style={{ borderRadius: '10px' }} onClick={() => dispatch(push(HOME))}>
      <BackPageIcon /> {i18.t('Record:goBack')}
    </UTIconButton>
  );

  const removeExpressionButtonRenderer = expression => (
    <UTIconButton
      className={styles.deleteButton}
      onClick={() => dispatch(ExpressionActions.removeExpression(expression.index))}
    >
      <DeleteElementIcon />
    </UTIconButton>
  );

  const editExpressionButtonRenderer = expression => (
    <UTIconButton
      className={styles.editButton}
      onClick={() => {
        dispatch(ExpressionActions.editExpression(expression.index, () => dispatch(push(HOME))));
        dispatch(push(HOME));
      }}
    >
      <EditIcon />
    </UTIconButton>
  );

  const expressionRenderer = expression => (
    <div className={styles.expressionContainer}>
      <UTLabel className={styles.expression}>{expression.value}</UTLabel>
      <div className={styles.expressionButtonsContainer}>
        {removeExpressionButtonRenderer(expression)}
        {editExpressionButtonRenderer(expression)}
      </div>
    </div>
  );

  const noExpressionsRenderer = () => (
    <UTLabel className={styles.emptyExpressionsText}>{i18.t('Record:emptyRecord')}</UTLabel>
  );

  const expressionsRenderer = () =>
    isEmpty(expressions) ? noExpressionsRenderer() : expressions.map(expressionRenderer);

  return (
    <div>
      {goBackToCalculatorButtonRenderer()}
      <div className={styles.titleBar}>
        <UTLabel className={styles.titleText}>{i18.t('Record:title')}</UTLabel>
        {!isEmpty(expressions) && removeAllExpressionsButtonRenderer()}
      </div>
      <div className={styles.expressionsContainer}>{expressionsRenderer()}</div>
    </div>
  );
};

Record.propTypes = {
  expressions: arrayOf(shape({ value: string, index: number }))
};

const mapStateToProps = state => ({ expressions: state.expressions.expressions });

export default connect(mapStateToProps)(Record);
