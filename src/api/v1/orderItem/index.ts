import { Router } from 'express';
const orderItemRouter = Router({mergeParams: true});

import {
    deleteOrderItem,
    addOrderItems,
    updateOrderItem
} from './orderItem.controller';

orderItemRouter.post('/', addOrderItems);
orderItemRouter.patch('/:id', updateOrderItem);
orderItemRouter.delete('/:id', deleteOrderItem);

export default orderItemRouter;