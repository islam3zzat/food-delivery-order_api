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

type orderItemLensType = {
    orderItems: Array<OrderItemModel>,
    owner: String,
    _id: String,
    cartId: String,
};

export function ordersLens(req: Request): orderItemLensType {
    const owner = get(req, 'user.id');

    const orderItems = get(req, 'body.orderItems', [])
        .map((orderItem: OrderItemModel) => {
        return {
            title: orderItem.title,
            quantity: orderItem.quantity,
            owner
        } as OrderItemModel;
    });
    return {
        orderItems,
        owner: get(req, 'user.id'),
        _id: get(req, 'params.id'),
        cartId: get(req, 'params.cartId')
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

