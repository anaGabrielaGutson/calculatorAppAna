import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(
  completeTypes([], ['ADD_EXPRESSION', 'REMOVE_EXPRESSION', 'REMOVE_ALL_EXPRESSIONS', 'EDIT_EXPRESSION']),
  '@@EXPRESSIONS'
);

export const actionCreators = {
  addExpression: expression => async dispatch =>
    dispatch({ type: actions.ADD_EXPRESSION, payload: expression }),
  removeExpression: expression => async dispatch =>
    dispatch({ type: actions.REMOVE_EXPRESSION, payload: expression }),
  removeAllExpressions: () => async dispatch => dispatch({ type: actions.REMOVE_ALL_EXPRESSIONS }),
  editExpression: (index, successCallback) => async dispatch => {
    dispatch({ type: actions.EDIT_EXPRESSION, payload: index });
    if (successCallback) successCallback();
  }
};

export default actionCreators;
