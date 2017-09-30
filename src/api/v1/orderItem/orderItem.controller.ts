import { Response, Request, NextFunction } from 'express';
import { default as OrderItem, OrderItemModel } from '../../../models/OrderItem';
import { default as Cart, CartModel } from '../../../models/Cart';
import { orderLens } from '../../../utils/lens';

/**
 * creates order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function addOrderItem (req: Request, res: Response) {
    const {title,  quantity, owner, cartId} = orderLens(req);
    Cart.findById(cartId)
        .then(function cartFound(cart: CartModel) {
            if (cart) {
                OrderItem.create({title,  quantity, owner, cart: cartId})
                    .then( function orderCreated(orderItem: OrderItemModel) {
                        cart.orderItems.push(orderItem);
                        cart.save()
                            .then(function cartSaved(){
                                res.json(orderItem);
                            })
                            .catch(function cartDidnotSave(cartUpdateErr: Error) {
                                res.status(500).json({err: cartUpdateErr});
                            });
                    })
                    .catch(function orderNotCreated(orderSaveErr: Error) {
                        res.status(500).json({err: orderSaveErr});
                    });
            } else {
                res.status(404).json({message: `cart '${cartId}' was not found`});
            }
        })
        .catch(function couldntFindCart(cartFetchErr: Error) {
            res.status(500).json({err: cartFetchErr});
        });

}

/**
 * updates order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function updateOrderItem (req: Request, res: Response) {
    const {title, quantity, owner, _id} = orderLens(req);
    OrderItem.findOne({_id, owner})
        .then(function orderFound(order: OrderItemModel) {
            if (!order) {
                res.status(404).json({message: `Order not found by the id of ${_id} for user ${owner}`});
            } else {
                order.title = title || order.title;
                order.quantity = quantity || order.quantity;
                order.save()
                    .then(function orderUpdated(doc: OrderItemModel) {
                        res.json(order);
                    })
                    .catch(function orderDidNotUpdate(saveErr: Error) {
                        res.status(500).json({err: saveErr});
                    });
            }
        })
        .catch(function orderNotFound(err: Error) {
            res.status(500).json({err});
        });
}

/**
 * removes order item
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function deleteOrderItem (req: Request, res: Response) {
    const {owner, _id} = orderLens(req);
    OrderItem.findOneAndRemove({owner, _id})
        .then(function () {
            res.json({success: true});
        })
        .catch(function (err: Error) {
            res.status(500).json({err});

        });
}
