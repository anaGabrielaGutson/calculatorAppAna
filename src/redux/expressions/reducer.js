import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  expressions: [],
  editIndex: null
};

const reducerDescription = {
  primaryActions: [
    actions.FETCH_EXPRESSIONS,
    actions.ADD_EXPRESSION,
    actions.DELETE_EXPRESSION,
    actions.EDIT_EXPRESSION
  ],
  override: {
    [actions.REWRITE_EXPRESSION]: (state, action) =>
      Immutable.merge(state, {
        editIndex: action.payload
      })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
