import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  expressions: [],
  actualIndex: 0,
  editMode: false,
  editIndex: null
};

const reducerDescription = {
  primaryActions: [actions.ADD_EXPRESSION, actions.REMOVE_EXPRESSION],
  override: {
    [actions.ADD_EXPRESSION]: (state, action) =>
      Immutable.merge(state, {
        expressions: state.expressions.concat(action.payload),
        actualIndex: state.actualIndex + 1
      }),
    [actions.REMOVE_EXPRESSION]: (state, action) =>
      Immutable.merge(state, {
        expressions: state.expressions.filter(expression => expression.index !== action.payload)
      }),
    [actions.REMOVE_ALL_EXPRESSIONS]: () => defaultState,
    [actions.EDIT_EXPRESSION]: (state, action) =>
      Immutable.merge(state, {
        editIndex: action.payload
      })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
