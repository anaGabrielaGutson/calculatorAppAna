import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  inputValues: {},
  lastName: null,
  name: null
};

const reducerDescription = {
  primaryActions: [actions.SUBMIT_FORM],
  override: {
    [actions.SAVE_VALUES]: (state, action) =>
      Immutable.merge(state, {
        name: action.payload.name,
        lastName: action.payload.lastName
      })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
