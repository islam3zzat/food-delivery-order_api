import { Response, Request } from 'express';
import { default as Cart, CartModel } from '../../../models/Cart';
import { cartLens } from '../../../utils/lens';

/**
 * gets user carts
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function myCarts (req: Request, res: Response) {
    try {
        const carts = await Cart.find({owner: req.user.id, deleted: false});
        res.json(carts);
    } catch (err) {
        res.status(500).json({err});
    }
}

/**
 * gets cart by id
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function getCart (req: Request, res: Response) {
    try {
        const cart = await Cart.getDetails(req.params.id);
        res.json(cart);
    } catch (err) {
        console.dir(err);
        res.status(500).json({err});
    }
}

/**
 * creates new cart
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function createCart (req: Request, res: Response) {
    const passedCart = cartLens(req);
    try {
        const cart = await Cart.create(<Object> passedCart);
        res.json(cart);
    } catch (err) {
        res.status(500).json({err});
    }
}

/**
 * updates cart props
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function updateCart (req: Request, res: Response) {
    const {name, restaurant, deleted, owner, _id} = cartLens(req);
    try {
        const cart = await Cart.findOne({_id, owner});
        if (!cart) {
            res.status(404).json({message: `cart '${_id}' was not found`});
        } else {
            const savedCart = await updateCartWithValues(cart as CartModel, name, restaurant, deleted);
            res.json(cart);
        }
    } catch (err) {
        res.status(500).json({err});
    }
}

/**
 * Update cart with provided values
 * @param {CartModel} cart
 * @param {string} name
 * @param {string} restaurant
 * @param {boolean} deleted
 * @return {Promise<CartModel>}
 */
function updateCartWithValues(cart: CartModel, name = cart.name, restaurant = cart.restaurant, deleted = cart.deleted ) {
    cart.name = name;
    cart.restaurant = restaurant;
    cart.deleted = deleted;
    return cart.save();
}

/**
 * delets cart
 * @param {e.Request} req
 * @param {e.Response} res
 */
export async function deleteCart (req: Request, res: Response) {
    try {
        const deleteResp = await Cart.update({_id: req.params.id}, {deleted: true});
        res.json(deleteResp);
    } catch (err) {
        res.status(500).json({err});
    }
}