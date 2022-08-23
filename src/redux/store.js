import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createMiddleware as createAnalyticsMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { reducer as formReducer } from 'redux-form';
import { fetchMiddleware } from 'redux-recompose';

import eventDefinitions from 'constants/eventDefinitions';

import { reducer as characters } from './characters/reducer';

export const history = createBrowserHistory();

const eventsMap = { ...eventDefinitions };

const AnalyticsMiddleware = createAnalyticsMiddleware(eventsMap, GoogleAnalytics);

const deleteValue = (state, action) => {
  if (action.type === '@@redux-form/UNREGISTER_FIELD') {
    if (state) {
      const {
        values: { [action.payload.name]: unregistered, ...values }
      } = state;
      return { ...state, values };
    }
  }
  return state;
};

const form = formReducer.plugin({
  UTFORM: deleteValue
});

const reducers = combineReducers({
  characters,
  router: connectRouter(history),
  form
});

const middlewares = [routerMiddleware(history)];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Analytics Middleware ------------- */
middlewares.push(AnalyticsMiddleware);

/* ------------- Redux-composer Middleware ------------- */
middlewares.push(fetchMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

const composeEnhancers =
  // eslint-disable-next-line no-underscore-dangle
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = (state, action) => reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
