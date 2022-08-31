const Customer = require('../models/customerModel').Customer;

const customerController = {};

customerController.getAllCustomers = (req, res, next) => {
  Customer.find({}, (err, searchRes) => {
    if (err) return next({
      log: 'Database issue, couldn\'t retrieve customers in getAllCustomers middleware in customerController',
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

customerController.createNewCustomer = (req, res, next) => {
  const { fullName, email, street1, street2, city, state, zip } = req.body;

  Customer.create({
    fullName: fullName,
    email: email,
    street1: street1,
    street2: street2,
    city: city,
    state: state,
    zip: zip
  }, (err, createRes) => {
    if (err) return next({
      log: 'Couldn\'t create new user in the createNewCustomer middleware in the customerController',
      message: err
    })

    if (createRes) {
      res.locals.createdUser = createRes;
      return next();
    }

    if (!createRes) {
      res.locals.createdUser = 'Error creating a new user, but request was valid';
      return next();
    }
  })
}

customerController.findUser = (req, res, next) => {
  const { email } = req.body;

  Customer.find({ email: email }, (err, searchRes) => {
    if (err) return next({
      log: 'Database issue, couldn\'t retrieve customers in getAllCustomers middleware in customerController',
      status: 502,
      message: err,
    });

    // Pass the data found in the search to the next invokation
    if (searchRes) {
      res.locals.foundUser = searchRes;
      return next();
    }

    if (!searchRes) return next();
  });
}

customerController.deleteUser = (req, res, next) => {
  // axios has a very specific way of formating delete requests: find user id at req.body.source
  const userId = req.body.source;

  Customer.deleteOne({ _id: userId }, (err, deleteRes) => {
    if (err) return next({
      log: 'Server error while deleting a customer in the deleteUser middleware in customerController',
      message: err
    });

    if (deleteRes) {
      res.locals.didDelete = 'Successfully deleted user';
      return next();
    }

    // Unsure when this would ever fire, but don't want to risk breaking next chain
    if (!deleteRes) return next();
  })
  return next();
}

customerController.updateUser = (req, res, next) => {
  const { userId, fullName, email, street1, street2, city, state, zip } = req.body; // need to attach to request specific things needed for edit

  Customer.findOneAndUpdate({ _id: userId },
    {
      fullName: fullName,
      email: email,
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zip: zip
    }, (err, updateRes) => {
      if (err) return next({
        log: 'Server issue while trying to update user in the findOneAndUpdate middleware in customerController',
        message: err
      })

      if (updateRes) {
        res.locals.updatedUser = updateRes;
        return next();
      }

      if (!updateRes) {
        res.locals.updatedUser = 'Failed to updated user in database, but not a server / db error. Possible schema error';
        return next();
      }
    })
}

module.exports = customerController;