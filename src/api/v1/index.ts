import { Router } from 'express';
import { authenticate } from '../../utils/auth';

import authRouter from './auth';
import cartRouter from './cart';
import orderItemRouter from './orderItem';

const v1Router = Router();
v1Router.use('/auth', authRouter);
v1Router.use('/cart', authenticate, cartRouter);
v1Router.use('/order/:cartId', authenticate, orderItemRouter);

export default v1Router;