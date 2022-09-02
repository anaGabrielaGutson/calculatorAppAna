import React from 'react';
import { UTLabel } from '@widergy/energy-ui';
import 'scss/variables/_sizes.scss';

import logo from 'app/assets/logo.png';

import styles from './styles.module.scss';

const Topbar = () => (
  <div className={styles.container}>
    <UTLabel className={styles.appName} >{`calculator`}</UTLabel>
    <div className={styles.brand}>
      <UTLabel bold large black>{`GUTSONS`}</UTLabel>
      <img alt="logo" src={logo} width={80} />
    </div>
  </div>
);

export default Topbar;
