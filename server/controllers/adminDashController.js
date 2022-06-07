const Customer = require('../models/customerModel').Customer;
const Admin = require('../models/customerModel').Admin;

const adminDashController = {};

adminDashController.getAllCustomers = (req, res, next) => {
  Customer.find({}, (err, searchRes) => {
    if (err) return next({
      log: 'Database issue, couldn\'t retrieve customers in getAllCustomers controller',
      status: 502,
      message: err,
    });

    // Pass the data found in the search to the next invokation
    if (searchRes) return next();

    // Unsure when this would ever fire, but don't want to risk breaking next chain
    if (!searchRes) return next();
  });
}

module.exports = adminDashController;