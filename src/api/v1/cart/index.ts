import { Router } from 'express';
const cartRouter = Router();

import {
    myCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart
} from './cart.controller';

cartRouter.get('/', myCarts);
cartRouter.get('/:id', getCart);
cartRouter.post('/', createCart);
cartRouter.patch('/:id', updateCart);
cartRouter.delete('/:id', deleteCart);

export default cartRouter;