import { Router, Request, Response } from 'express';
import adminController from '../controllers/adminController';

const { adminLogin, addRefreshToken } = adminController;
const authRouter = Router();

authRouter.post('/', adminLogin, addRefreshToken, (req: Request, res: Response) => {
  console.log('returning: adminController.adminLogin');
  return res.status(200).json(res.locals.isAdmin);
});

export default authRouter;
