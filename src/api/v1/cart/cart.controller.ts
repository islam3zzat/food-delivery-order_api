import { Response, Request } from 'express';
import { default as Cart, CartModel } from '../../../models/Cart';
import { cartLens } from '../../../utils/lens';
/**
 * gets user carts
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function myCarts (req: Request, res: Response) {
    Cart.find({owner: req.user.id, deleted: false})
        .then( function cartFound( carts: [CartModel]) {
            res.json(carts);
        })
        .catch(function cartFetchError(err: Error) {
            res.status(500).json({err});
        });
}

/**
 * gets cart by id
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function getCart (req: Request, res: Response) {
    Cart.findById(req.params.id)
        .populate({
            path: 'orderItems',
            populate: {
                path: 'owner'
            }
        })
        .then(function gotCart(cart: CartModel) {
            res.json(cart);
        })
        .catch(function couldntGetCart(err: Error) {
            res.status(500).json({err});
        });
}

/**
 * creates new cart
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function createCart (req: Request, res: Response) {
    const passedCart = cartLens(req);
    Cart.create(<Object> passedCart)
        .then(function cartCreated(cart: CartModel) {
            res.json(cart);
        })
        .catch(function couldntCreateCart(err: Error) {
            res.status(500).json({err});
        });
}

/**
 * updates cart props
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function updateCart (req: Request, res: Response) {
    const {name, restaurant, deleted, owner, _id} = cartLens(req);
    Cart.findOne({_id, owner})
        .then(function cartFound(cart: CartModel) {
            if (!cart) {
                res.status(404).json({message: `cart '${_id}' was not found`});
            } else {
                cart.name = name || cart.name;
                cart.restaurant = restaurant || cart.restaurant;
                if (deleted !== undefined) {
                    cart.deleted = deleted;
                }
                cart.save()
                    .then(function cartSaved() {
                        res.json(cart);
                    })
                    .catch(function cartNotSaved(saveErr: Error) {
                        res.status(500).json({saveErr});
                    });
            }
        })
        .catch(function couldntFindCart(err: Error) {
            res.status(500).json({err});
        });
}

/**
 * delets cart
 * @param {e.Request} req
 * @param {e.Response} res
 */
export function deleteCart (req: Request, res: Response) {
    Cart.update({_id: req.params.id}, {deleted: true})
        .then(function cartDeleted(rawResponse: [{}]) {
            res.json(rawResponse);
        })
        .catch(function (err: Error) {
            res.status(500).json({err});
        });

}