/* 
Array of strings that defines customers' name, 
this is used to check whether it is a valid customer or not
*/
exports.CUSTOMERS = ['someCustomer'];

exports.ENVIRONMENTS = ['dev', 'qa', 'prod'];

// You could add here specific environment customers variables
exports.CUSTOMER_ENVIRONMENTS_CONF = {
  someCustomer: {
    dev: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    qa: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    prod: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    }
  }
};

// You could add here multiple customers and their environment variables
exports.CUSTOMERS_CONF = {
  someCustomer: {
    REACT_APP_WEB_TITLE: 'Widergy - React app bootstrap'
  }
};

// You could add here specific environment variables
exports.ENVIRONMENTS_CONF = {
  dev: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  },
  qa: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  },
  prod: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  }
};
