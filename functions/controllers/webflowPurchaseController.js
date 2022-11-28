const usersDB = require('../config/usersPGInstance');

const webflowPurchaseController = {};

webflowPurchaseController.checkCustomerInfo = async (req, res, next) => {
  const { email } = req.body;

  const checkCustomerExistsQuery = 'SELECT * FROM "users"."customers" WHERE "email" = $1;';
  try {
    const foundCustomer = await usersDB.query(checkCustomerExistsQuery, [email]);

    if (foundCustomer.rows.length === 0) {
      return webflowPurchaseController.createCustomer(req, res, next);
    }

    res.locals.foundUser = foundCustomer.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'Error finding customer in DB: ' + err,
      status: 400,
    });
  }
};

webflowPurchaseController.createCustomer = async (req, res, next) => {
  const { email, fullName, street1, street2, city, state, zip } = req.body;

  const addCustomerQuery =
    'INSERT INTO "users"."customers" ("full_name", "email", "street_1", "street_2", "city", "state", "zip") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
  try {
    const newCustomer = await usersDB.query(addCustomerQuery, [fullName, email, street1, street2, city, state, zip]);
    res.locals.newUser = newCustomer.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'Error adding a new customer to the DB: ' + err,
      status: 400,
    });
  }
};

module.exports = webflowPurchaseController;
