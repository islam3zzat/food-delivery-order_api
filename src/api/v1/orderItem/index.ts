import { Router } from 'express';
const orderItemRouter = Router({mergeParams: true});

import {
    deleteOrderItem,
    addOrderItem,
    updateOrderItem
} from './orderItem.controller';

orderItemRouter.post('/', addOrderItem);
orderItemRouter.patch('/:id', updateOrderItem);
orderItemRouter.delete('/:id', deleteOrderItem);

export default orderItemRouter;