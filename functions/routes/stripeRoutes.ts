import { Router, Request, Response } from 'express';
import { getTotalRevenue } from '../controllers/stripeController';

const stripeRouter = Router();

stripeRouter.get('/', getTotalRevenue, (req: Request, res: Response) => {
  console.log('returning: stripeController.getTotalRevenue');
  return res.status(200).json(res.locals); // sending back the new or existing users info for fun
});

export default stripeRouter;
