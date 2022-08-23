import ReactGA from 'react-ga';

if (!window.ga) {
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_TRACKING_ID, { titleCase: false });
}
