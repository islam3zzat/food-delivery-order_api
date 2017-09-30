import * as mongoose from 'mongoose';
import User, { UserModel } from './User';
import OrderItem, { OrderItemModel } from './OrderItem';

export type CartModel = mongoose.Document & {
    name: string,
    restaurant: string,
    orderItems: [OrderItemModel],
    owner: UserModel
};


const cartSchema = new mongoose.Schema({
    name: String,
    restaurant: String,
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

//
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;