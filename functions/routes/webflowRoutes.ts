import { Router, Request, Response } from 'express';
import { checkCustomerInfo } from '../controllers/webflowPurchaseController';

const webflowRouter = Router();

webflowRouter.post('/', checkCustomerInfo, (req: Request, res: Response) => {
  console.log('returning: webflowPurchaseController.checkCustomerInfo');
  return res.status(200).json(res.locals.newUser || res.locals.foundUser); // sending back the new or existing users info for fun
});

export default webflowRouter;
