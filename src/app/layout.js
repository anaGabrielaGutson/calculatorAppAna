import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { HOME, HISTORIAL } from 'constants/routes';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import Historial from './screens/Historial';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.container}>
    <Topbar />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={HISTORIAL} component={Historial} />
      </Switch>
    </ConnectedRouter>
  </div>
);

export default App;
