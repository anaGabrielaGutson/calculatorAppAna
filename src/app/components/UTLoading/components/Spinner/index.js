import React from 'react';
import { string, number, any } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UTLabel } from '@widergy/energy-ui';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles.module.scss';

const Loading = ({ className, thickness = 1.5, size = 85, containerSpinner }) => (
  <div className={`${styles.container} ${className}`} style={containerSpinner}>
    <CircularProgress className={styles.loading} size={size} thickness={thickness} />
    <UTLabel className={styles.text} black medium>
      Cargando...
    </UTLabel>
  </div>
);

Loading.propTypes = {
  className: string,
  size: number,
  thickness: number,
  containerSpinner: any // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles.spinnerStyle)(Loading);
