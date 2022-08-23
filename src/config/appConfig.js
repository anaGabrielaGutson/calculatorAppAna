import someCustomer from 'config/someCustomer/config';

const configs = {
  someCustomer
};

export default configs[process.env.REACT_APP_UTILITY_NAME];
