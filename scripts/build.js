const { execSync } = require('child_process');

const CUSTOM_ERRORS = require('./errors');
const CONFIG = require('./config');

// Since this is a build process, specifying a customer is mandatory.
const customer = process.argv[2];

if (!customer) {
  throw new CUSTOM_ERRORS.NoCustomerError();
}

if (!CONFIG.CUSTOMERS.includes(customer)) {
  throw new CUSTOM_ERRORS.InvalidCustomer('build');
}

// If no environment is specified, we asume a production build.
const environment = process.argv[3] || 'prod';

if (!CONFIG.ENVIRONMENTS.includes(environment)) {
  throw new CUSTOM_ERRORS.InvalidEnvironment('build');
}

// Common environment variables can be defined here:
process.env.REACT_APP_ENV = environment;
process.env.REACT_APP_VERSION = process.env.npm_package_version;
process.env.REACT_APP_UTILITY_NAME = customer;
process.env.SASS_PATH = `src/config/${customer}/scss/`;

// Here we bring customer-specific variables setted in the config.js file and add them to the environment.
const customerConfig = CONFIG.CUSTOMERS_CONF[customer];

if (customerConfig) {
  Object.keys(customerConfig).forEach(key => (process.env[key] = customerConfig[key]));
}

// We do the same with environment-specific variables.
const envConfig = CONFIG.ENVIRONMENTS_CONF[environment];

if (envConfig) {
  Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
}

// We do the same with customer-environment-specific variables.
const customerEnvConfig = CONFIG.CUSTOMER_ENVIRONMENTS_CONF[customer];

if (customerEnvConfig[environment]) {
  Object.keys(customerEnvConfig[environment]).forEach(
    key => (process.env[key] = customerEnvConfig[environment][key])
  );
}

/* 
If you need to download customer-specific assets from amazon S3
you can uncomment this line, set the right s3 bucket and sync it here
*/
// execSync(`aws s3 sync s3://${CONFIG.ASSETS_BUCKET[environment]}/${customer} src/app/assets/ --delete`, {
//   stdio: [0, 1, 2]
// });

// Then the app is builded with react-scripts, or you can set your prefered build script or steps
execSync(`react-scripts build`, { stdio: [0, 1, 2] });
