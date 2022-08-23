import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  quotes: []
};

const reducerDescription = {
  primaryActions: [actions.GET_QUOTES],
  override: {
    [actions.RESET_QUOTES]: state => Immutable.merge(state, { quotes: defaultState.quotes })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
