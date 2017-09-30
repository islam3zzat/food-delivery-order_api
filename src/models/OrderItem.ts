import * as mongoose from 'mongoose';
import User, {UserModel} from './User';
import {CartModel} from './Cart';

export type OrderItemModel = mongoose.Document & {
    title: string,
    quantity: number,
    owner: UserModel,
    cart: CartModel
};


const orderItemSchema = new mongoose.Schema({
    title: String,
    quantity: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
}, {timestamps: true});

//
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;