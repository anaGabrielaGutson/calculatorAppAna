const { execSync } = require('child_process');

const CUSTOM_ERRORS = require('./errors');
const CONFIG = require('./config');

// Since this is a sync process, specifying a customer is mandatory.
const customer = process.argv[2];

if (!customer) {
  throw new CUSTOM_ERRORS.NoCustomerError();
}

if (!CONFIG.CUSTOMERS.includes(customer)) {
  throw new CUSTOM_ERRORS.InvalidCustomer('sync');
}

// If no environment is specified, we asume a dev sync.
const environment = process.argv[3] || 'dev';

if (!CONFIG.ENVIRONMENTS.includes(environment)) {
  throw new CUSTOM_ERRORS.InvalidEnvironment('sync');
}

execSync(`aws s3 sync s3://${CONFIG.ASSETS_BUCKET[environment]}/${customer} src/app/assets/ --delete`, {
  stdio: [0, 1, 2]
});