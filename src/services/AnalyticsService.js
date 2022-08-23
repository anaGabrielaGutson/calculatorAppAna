import { createMiddleware as createAnalyticsMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_TRACKING_ID, { titleCase: false });
export const trackEvent = (category, action, label, value) =>
  ReactGA.event({ category, action, label, value });

const pageView = action => ({
  hitType: 'pageview',
  page: action.payload.pathname
});

const eventsMap = {
  '@@router/LOCATION_CHANGE': pageView
};

export default createAnalyticsMiddleware(eventsMap, GoogleAnalytics);
