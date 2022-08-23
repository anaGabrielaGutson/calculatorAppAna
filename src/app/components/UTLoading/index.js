import React from 'react';
import { any, bool, string } from 'prop-types';

import Loading from './components/Spinner/index';

const UTLoading = ({ loading, text, containerSpinner, className, children }) =>
  loading ? (
    <Loading text={text} className={className} containerSpinner={containerSpinner} /> // eslint-disable-line react/prop-types
  ) : (
    children
  );

UTLoading.propTypes = {
  loading: bool,
  text: string,
  className: string,
  containerSpinner: any // eslint-disable-line react/forbid-prop-types
};

export default UTLoading;
