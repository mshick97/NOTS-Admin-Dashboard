import { Request, Response, NextFunction } from 'express';
import usersDB from '../config/usersPGInstance';

const webflowPurchaseController = {
  checkCustomerInfo: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const checkCustomerExistsQuery = 'SELECT * FROM "users"."customers" WHERE "email" = $1;';
    try {
      const foundCustomer = await usersDB.query(checkCustomerExistsQuery, [email]);

      if (!foundCustomer?.rows) {
        return next({
          log: 'Rows property does not exist on foundCustomer object in webflowPurchaseController',
        });
      }

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
  },

  createCustomer: async (req: Request, res: Response, next: NextFunction) => {
    const { email, fullName, street1, street2, city, state, zip } = req.body;

    const addCustomerQuery =
      'INSERT INTO "users"."customers" ("full_name", "email", "street_1", "street_2", "city", "state", "zip") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
    try {
      const newCustomer = await usersDB.query(addCustomerQuery, [fullName, email, street1, street2, city, state, zip]);

      if (!newCustomer?.rows) {
        return next({
          log: 'Rows property does not exist on newCustomer object in webflowPurchaseController',
        });
      }

      res.locals.newUser = newCustomer.rows[0];
      return next();
    } catch (err) {
      return next({
        log: 'Error adding a new customer to the DB: ' + err,
        status: 400,
      });
    }
  },
};

export default webflowPurchaseController;
export const checkCustomerInfo = webflowPurchaseController.checkCustomerInfo;
export const createCustomer = webflowPurchaseController.createCustomer;

// const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
// const NOTS_HAIR_SITE_ID = process.env.NOTS_HAIR_SITE_ID;
// const WEBFLOW_API_URL = 'https://api.webflow.com';

// const stripeController = {};

// stripeController.webflowTest = async (req, res, next) => {
//   const overviewData = await axios.get(`${WEBFLOW_API_URL}/sites/${NOTS_HAIR_SITE_ID}/orders`, {
//     headers: { 'Authorization': `Bearer ${WEBFLOW_API_KEY}` }
//   });

//   res.locals.overviewData = overviewData;
//   return next();
// };
