import { Request } from 'express';
import { get } from 'lodash';
import { CartModel } from '../models/Cart';
import {OrderItemModel} from '../models/OrderItem';

export function cartLens(req: Request): Partial<CartModel> {
    return {
        name: get(req, 'body.name'),
        restaurant: get(req, 'body.restaurant'),
        deleted: get(req, 'body.deleted'),
        owner: get(req, 'user.id'),
        _id: get(req, 'params.id')
    };
}

export function orderLens(req: Request): Partial<OrderItemModel>&{cartId: string} {
    return {
        title: get(req, 'body.title'),
        quantity: get(req, 'body.quantity'),
        owner: get(req, 'user.id'),
        _id: get(req, 'params.id'),
        cartId: get(req, 'params.cartId')
    };
}
