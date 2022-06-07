const Customer = require('../models/customerModel').Customer;
const Admin = require('../models/customerModel').Admin;

const webflowPurchaseController = {};

webflowPurchaseController.checkCustomerInfo = (req, res, next) => {
  // // For testing whether the req.body is populating correctly and can fill our mockDB
  // const mockDB = [];
  // mockDB.push(req.body);
  // console.log(mockDB);
  // console.log('passing through webflow purchase controller');

  Customer.findOne({
    email: req.body.email
    // Don't need any of these since the only thing required in the schema is the email. SO if it finds the unique email, can send back entire customer
    // fullName: req.body.fullName,
    // street1: req.body.street1,
    // street2: req.body.street2,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip
  },
    (err, searchRes) => {
      // If an error occurs server side at this point, hand off to the global error handler
      if (err) return next({
        log: 'Internal server error'
      });

      // If customer does not exist -- create one with the only required field being the email
      if (!searchRes) return webflowPurchaseController.createCustomer(req, res, next);

      // If the cusomter does exist, return to next, but could eventually update some data here
      if (searchRes) {
        res.locals.foundUser = searchRes;
        return next();
      }
    });
}

webflowPurchaseController.createCustomer = (req, res, next) => {
  Customer.create({
    email: req.body.email,
    fullName: req.body.fullName,
    street1: req.body.street1,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  },
    (err, createRes) => {
      // Handle errors between database and the server
      if (err) return next({
        log: 'A server-side error has occured'
      });

      // Handle database related issue, such as schema not being met. Since schema only requires a unique string email, won't really fire much
      if (!createRes) return next();

      // Returns next if success
      if (createRes) {
        res.locals.newUser = createRes;
        return next();
      }
    });
}

module.exports = webflowPurchaseController;