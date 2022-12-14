import { Request, Response, NextFunction } from 'express';
import usersDB from '../config/usersPGInstance';

const customerController = {
  getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
    const getCustomersQuery = 'SELECT * FROM "users"."customers";';
    try {
      const allCustomers = await usersDB.query(getCustomersQuery);

      if (!allCustomers?.rows) {
        return next({
          log: 'Rows property does not exist on allCustomers object in customerController',
        });
      }

      res.locals.customers = allCustomers.rows;
      return next();
    } catch (err) {
      return next({
        log: "Database issue, couldn't retrieve customers in customerController: " + err,
        status: 400,
      });
    }
  },

  createNewCustomer: async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, email, street_1, street_2, city, state, zip } = req.body;

    const addCustomerQuery =
      'INSERT INTO "users"."customers" ("full_name", "email", "street_1", "street_2", "city", "state", "zip") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';

    try {
      const addedCustomer = await usersDB.query(addCustomerQuery, [full_name, email, street_1, street_2, city, state, zip]);

      if (!addedCustomer?.rows) {
        return next({
          log: 'Rows property does not exist on addedCustomer object in customerController',
        });
      }

      res.locals.createdUser = addedCustomer.rows[0];
      return next();
    } catch (err) {
      return next({
        log: "Couldn't create new user in the createNewCustomer: " + err,
        status: 400,
      });
    }
  },

  findUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      const findUserQuery = 'SELECT * FROM "users"."customers" WHERE "email" LIKE $1';
      const foundUser = await usersDB.query(findUserQuery, ['%' + email + '%']); // percentage signs needed when using LIKE operator to indicate any sequence + pattern + any sequence

      if (!foundUser?.rows) {
        return next({
          log: 'Rows property does not exist on foundUser object in customerController',
        });
      }

      res.locals.foundUser = foundUser.rows;
      return next();
    } catch (err) {
      return next({
        log: 'Issue querying to find user in findUser middleware: ' + err,
        status: 400,
        message: 'Issue querying for the user in database',
      });
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    // axios has a very specific way of formating delete requests: find user id at req.body.source
    const userId = req.params.id;

    try {
      const deleteUserQuery = 'DELETE FROM "users"."customers" WHERE "id" = $1 RETURNING *;';
      const deletedUser = await usersDB.query(deleteUserQuery, [userId]);

      if (!deletedUser?.rows) {
        return next({
          log: 'Rows property does not exist on deletedUser object in customerController',
        });
      }

      if (deletedUser.rows.length === 0) {
        res.locals.didDelete = false;
        return next();
      }

      res.locals.didDelete = true;
      return next();
    } catch (err) {
      return next({
        log: 'Error deleting the user from the database in deleteUser middleware: ' + err,
        status: 400,
      });
    }
  },
};

export default customerController;
export const getAllCustomers = customerController.getAllCustomers;
export const createNewCustomer = customerController.createNewCustomer;
export const findUser = customerController.findUser;
export const deleteUser = customerController.deleteUser;
