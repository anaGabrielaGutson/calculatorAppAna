// Custom error to use when no customer is defined when calling build script.
class NoCustomerError extends Error {
  constructor() {
    super();
    this.message = 'No customer was defined. Exiting build process...';
    this.name = 'Fatal Error';
    this.stack = '';
  }
}

class InvalidCustomer extends Error {
  constructor(process) {
    super();
    this.message = `Specified customer is not defined as a valid one. Exiting ${process} process...`;
    this.name = 'Fatal Error';
    this.stack = '';
  }
}
class InvalidEnvironment extends Error {
  constructor(process) {
    super();
    this.message = `Specified environment is not defined as a valid one. Exiting ${process} process...`;
    this.name = 'Fatal Error';
    this.stack = '';
  }
}

exports.NoCustomerError = NoCustomerError;
exports.InvalidCustomer = InvalidCustomer;
exports.InvalidEnvironment = InvalidEnvironment;
