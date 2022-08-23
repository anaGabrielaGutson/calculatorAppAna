import { createTypes, completeTypes } from 'redux-recompose';

import CharactersService from 'services/CharactersService';

export const actions = createTypes(completeTypes(['GET_QUOTES'], ['RESET_QUOTES']), '@@CHARACTERS');

const privateActionCreators = {
  getQuotesSuccess: payload => ({ type: actions.GET_QUOTES_SUCCESS, payload, target: 'quotes' }),
  getQuotesFailure: () => ({ type: actions.GET_QUOTES_FAILURE, target: 'quotes' })
};

export const actionCreators = {
  getQuotes: count => async dispatch => {
    dispatch({ type: actions.GET_QUOTES, target: 'quotes' });
    const response = await CharactersService.getQuotes(count);
    if (response.ok) {
      dispatch(privateActionCreators.getQuotesSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getQuotesFailure(response.error));
    }
  },
  resetQuotes: () => async dispatch => dispatch({ type: actions.RESET_QUOTES })
};

export default actionCreators;
