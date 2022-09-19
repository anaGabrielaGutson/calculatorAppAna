import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import { history } from 'redux/store';
import { HOME, RECORD, CONTACT_US } from 'constants/routes';

import ContactUs from './screens/ContactUs';
import Home from './screens/Home';
import Record from './screens/Record';
import styles from './styles.module.scss';
import Topbar from './components/Topbar';

const App = () => (
  <div className={styles.container}>
    <Topbar />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={RECORD} component={Record} />
        <Route exact path={CONTACT_US} component={ContactUs} />
        <Route render={() => <Redirect to={HOME} />} />
      </Switch>
    </ConnectedRouter>
  </div>
);

export default App;
