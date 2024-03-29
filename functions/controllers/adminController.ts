import { Request, Response, NextFunction } from 'express';
import usersDB from '../config/usersPGInstance';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const adminController = {
  adminLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const findAdminQuery = 'SELECT * FROM "users"."admins" WHERE "email" = $1;';

    try {
      const adminQuery = await usersDB.query(findAdminQuery, [email]);

      if (!adminQuery?.rows) {
        return next({
          log: 'Rows property does not exist on adminQuery object in adminController',
        });
      }

      if (adminQuery.rows.length === 0) {
        res.locals.validLogin = false;
        return res.status(401).json(res.locals); // frontend expecting an object with the validLogin property
      }

      const adminResults = adminQuery.rows[0];
      await bcrypt.compare(password + process.env.BCRYPT_SECRET, adminResults.password, async function (error, result) {
        if (error) {
          return next({
            log: error,
            message: 'Invalid email or password',
          });
        }

        if (!result) {
          res.locals.validLogin = false;
          return res.status(401).json(res.locals); // frontend expecting an object with the validLogin property
        }

        res.locals.adminResults = adminResults;
        return next();
      });
    } catch (err) {
      return next({
        log: 'Error occurred in the adminController: ' + err,
        status: 400,
        message: 'An error occurred when logging in',
      });
    }
  },

  addRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    const { email, first_name, last_name } = res.locals.adminResults;

    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      return next({
        log: 'ACCESS or REFRESH token secret(s) are undefined in admin controller',
      });
    }
    // Creating access token for short session access to APIs and storing the refresh token to refresh access tokens
    const accessToken = jwt.sign(
      { username: email },
      process.env.ACCESS_TOKEN_SECRET,
      // { expiresIn: '600s' }
      { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
      { username: email },
      process.env.REFRESH_TOKEN_SECRET,
      // { expiresIn: '1d' }
      { expiresIn: '40s' }
    );

    const addTokenQuery = 'UPDATE "users"."admins" SET "refresh_token" = $1 WHERE "email" = $2 RETURNING *;';
    try {
      await usersDB.query(addTokenQuery, [refreshToken, email]);

      res.locals.isAdmin = {
        validLogin: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        adminName: { firstName: first_name, lastName: last_name },
      };

      res.setHeader('Cache-Control', 'private').cookie('__session', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }); // setting max age to one day + sending back the refresh token as the cookie + not accessible by JS
      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in the addRefreshToken in adminController: ' + err,
        status: 400,
        message: 'An error occurred when logging in',
      });
    }
  },
};

export default adminController;
export const adminLogin = adminController.adminLogin;
export const addRefreshToken = adminController.addRefreshToken;
