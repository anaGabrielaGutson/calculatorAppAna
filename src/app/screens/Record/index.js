import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTIconButton, UTLabel } from '@widergy/energy-ui';
import { arrayOf, shape, string, number } from 'prop-types';
import { isEmpty } from '@widergy/web-utils/lib/array';
import i18 from 'i18next';

import { HOME } from 'constants/routes';
import ExpressionActions from 'redux/expressions/actions';

import { ReactComponent as TrashIcon } from '../../assets/trash_icon.svg';
import { ReactComponent as BackPageIcon } from '../../assets/backpage_icon.svg';

import Expression from './Components/Expression';
import styles from './styles.module.scss';

const Record = ({ expressions, dispatch }) => {
  useEffect(() => {
    dispatch(ExpressionActions.fetchExpressions());
  }, []);

  const handlerDeleteAll = async () => {
    expressions.forEach((expression, i) => {
      setTimeout(() => {
        dispatch(ExpressionActions.deleteExpression(expression.id));
        dispatch(ExpressionActions.fetchExpressions());
      }, i * 100);
    });
  };

  return (
    <div>
      <UTIconButton style={{ borderRadius: '10px' }} onClick={() => dispatch(push(HOME))}>
        <BackPageIcon /> {i18.t('Record:goBack')}
      </UTIconButton>
      <div className={styles.titleBar}>
        <UTLabel className={styles.titleText}>{i18.t('Record:title')}</UTLabel>
        {!isEmpty(expressions) && (
          <UTIconButton className={styles.deleteAllButton} onClick={handlerDeleteAll}>
            <TrashIcon />
          </UTIconButton>
        )}
      </div>
      <div className={styles.expressionsContainer}>
        {isEmpty(expressions) ? (
          <UTLabel className={styles.emptyExpressionsText}>{i18.t('Record:emptyRecord')}</UTLabel>
        ) : (
          expressions.map(expression => <Expression {...expression} key={expression.id} />)
        )}
      </div>
    </div>
  );
};

Record.propTypes = {
  expressions: arrayOf(shape({ value: string, index: number }))
};

const mapStateToProps = state => ({ expressions: state.expressions.expressions });

export default connect(mapStateToProps)(Record);
