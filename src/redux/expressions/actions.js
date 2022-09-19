import { createTypes, completeTypes } from 'redux-recompose';

import ExpressionsService from 'services/ExpressionsService';

export const actions = createTypes(
  completeTypes(
    ['DELETE_EXPRESSION', 'EDIT_EXPRESSION', 'ADD_EXPRESSION', 'FETCH_EXPRESSIONS'],
    ['REWRITE_EXPRESSION']
  ),
  '@@EXPRESSIONS'
);

const privateActionCreators = {
  addExpressionSuccess: data => ({
    type: actions.ADD_EXPRESSION_SUCCESS,
    payload: data,
    target: 'lastExpression'
  }),
  addExpressionFailure: error => ({
    type: actions.ADD_EXPRESSION_FAILURE,
    payload: error,
    target: 'lastExpression'
  }),
  deleteExpressionSuccess: data => ({
    type: actions.DELETE_EXPRESSION_SUCCESS,
    payload: data,
    target: 'deletedExpression'
  }),
  deleteExpressionFailure: error => ({
    type: actions.DELETE_EXPRESSION_FAILURE,
    payload: error,
    target: 'deletedExpression'
  }),
  editExpressionSuccess: data => ({
    type: actions.EDIT_EXPRESSION_SUCCESS,
    payload: data,
    target: 'expressionToEdit'
  }),
  editExpressionFailure: error => ({
    type: actions.EDIT_EXPRESSION_FAILURE,
    payload: error,
    target: 'expressionToEdit'
  }),
  fetchExpressionsSuccess: data => ({
    type: actions.FETCH_EXPRESSIONS_SUCCESS,
    payload: data,
    target: 'expressions'
  }),
  fetchExpressionsFailure: error => ({
    type: actions.FETCH_EXPRESSIONS_FAILURE,
    payload: error,
    target: 'expressions'
  })
};

export const actionCreators = {
  addExpression: expression => async dispatch => {
    dispatch({ type: actions.ADD_EXPRESSION, target: 'lastExpression' });
    const response = await ExpressionsService.postExpression(expression);
    if (response.ok) dispatch(privateActionCreators.addExpressionSuccess(response.data));
    else dispatch(privateActionCreators.addExpressionFailure(response.data));
  },
  deleteExpression: expression => async dispatch => {
    dispatch({ type: actions.DELETE_EXPRESSION, target: 'deletedExpression' });
    const response = await ExpressionsService.deleteExpression(expression);
    if (response.ok) dispatch(privateActionCreators.deleteExpressionSuccess(response.data));
    else dispatch(privateActionCreators.deleteExpressionFailure(response.data));
  },
  rewriteExpression: (id, successCallback) => async dispatch => {
    dispatch({ type: actions.REWRITE_EXPRESSION, payload: id });
    if (successCallback) successCallback();
  },
  editExpression: (id, expression) => async dispatch => {
    dispatch({ type: actions.EDIT_EXPRESSION, target: 'expressionToEdit' });
    const response = await ExpressionsService.putExpression(id, expression);
    if (response.ok) {
      dispatch(privateActionCreators.editExpressionSuccess(response.data));
      dispatch(actionCreators.rewriteExpression(null));
    } else dispatch(privateActionCreators.editExpressionFailure(response.data));
  },
  fetchExpressions: () => async dispatch => {
    dispatch({ type: actions.FETCH_EXPRESSIONS, target: 'expressions' });
    const response = await ExpressionsService.getExpressions();
    if (response.ok) dispatch(privateActionCreators.fetchExpressionsSuccess(response.data));
    else dispatch(privateActionCreators.fetchExpressionsFailure(response.data));
  }
};

export default actionCreators;
