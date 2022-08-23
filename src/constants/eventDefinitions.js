import { actions as charactersActions } from 'redux/characters/actions';
import { event } from 'utils/analyticsUtils';

import { categories, actions, labels } from './analytics';

const getQuotesSuccess = action =>
  event(
    categories.PERSONAJES,
    actions.RECUPERAR_PERSONAJES,
    labels.RECUPERAR_PERSONAJES_OK,
    action.payload && action.payload.length
  );

export default {
  [charactersActions.GET_QUOTES_SUCESS]: getQuotesSuccess
};
