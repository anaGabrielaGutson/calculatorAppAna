import React, { PureComponent } from 'react';
import Rollbar from 'rollbar';
import ReactGA from 'react-ga';
import { disableReactDevTools } from '@widergy/web-utils/lib/config';
import { EnergyThemeProvider } from '@widergy/energy-ui';

import App from './layout';
import { energyUITheme } from './styles';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    Rollbar.init({
      accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      hostWhiteList: ['widergy.com', 'widergydev.com'],
      payload: {
        environment: 'somecustomer'
      }
    });
    window.Rollbar = Rollbar;
  }

  componentDidMount() {
    ReactGA.set({ userId: 1 });
    disableReactDevTools(process.env.REACT_APP_ENV);
  }

  render() {
    return (
      <div>
        <EnergyThemeProvider theme={energyUITheme}>
          <App />
        </EnergyThemeProvider>
      </div>
    );
  }
}

export default AppContainer;
