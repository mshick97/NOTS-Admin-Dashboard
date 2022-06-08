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
    if (searchRes) {
      res.locals.customers = searchRes;
      return next();
    }

    // Unsure when this would ever fire, but don't want to risk breaking next chain
    if (!searchRes) return next();
  });
}

adminDashController.adminLogin = (req, res, next) => {
  Admin.findOne({ email: req.body.email, password: req.body.password },
    (err, searchRes) => {
      if (err) return next({
        log: 'Server error',
        status: 502
      });

      if (searchRes) {
        res.locals.isAdmin = true;
        return next();
      }

      if (!searchRes) {
        res.locals.isAdmin = false;
        return next();
      }
    });
}

module.exports = adminDashController;