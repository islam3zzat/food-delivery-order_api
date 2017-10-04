import { Document } from 'mongoose';
import { Response, Request, NextFunction } from 'express';
import { default as OrderItem, OrderItemModel } from '../../../models/OrderItem';
import { default as Cart, CartModel } from '../../../models/Cart';
import { orderLens } from '../../../utils/lens';
/**
 * creates order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function addOrderItem (req: Request, res: Response) {
    const {title,  quantity, owner, cartId} = orderLens(req);
    try {
        const cart = await Cart.findById(cartId) as CartModel;
        if ( cart ) {
            const savedOrderItem = await cart.addOrderItem(title, quantity, owner);
            res.json(savedOrderItem);
        } else {
            res.status(404).json({message: `cart '${cartId}' was not found`});
        }
    } catch (err) {
        res.status(500).json(err);
    }

}

/**
 * updates order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function updateOrderItem (req: Request, res: Response) {
    const {title, quantity, owner, _id} = orderLens(req);
    try {
        const order = await OrderItem.findOne({_id, owner}) as (Document & OrderItemModel);
        if (order) {
            const updatedOrder = await  updateOrderWithValues(order, title, quantity);
            res.json(order);
        } else {
            res.status(404).json({message: `order '${_id}' was not found`});
        }
    } catch (err) {
        res.status(500).json({err});
    }
}

function updateOrderWithValues(order: (Document & OrderItemModel), title = order.title, quantity = order.quantity) {
    order.title = title;
    order.quantity = quantity;
    return order.save();
}
/**
 * removes order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function deleteOrderItem (req: Request, res: Response) {
    const {owner, _id} = orderLens(req);
    try {
        const removedOrder = await OrderItem.findOneAndRemove({owner, _id});
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err});
    }
}
