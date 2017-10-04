import * as mongoose from 'mongoose';
import User, { UserModel } from './User';
import OrderItem, { OrderItemModel } from './OrderItem';

export type CartModel = mongoose.Document & {
    name: string,
    restaurant: string,
    orderItems: [OrderItemModel],
    owner: UserModel,
    deleted: boolean,
    done: boolean,
    addOrderItems: (orderItems: Array<OrderItemModel>) => Promise<OrderItemModel>,
};


const cartSchema = new mongoose.Schema({
    name: String,
    restaurant: String,
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    deleted: {type: Boolean, default: false},
    done: {type: Boolean, default: false}
}, {timestamps: true});

cartSchema.statics.getDetails = function getDetails (id: string, cb: Function) {
    return this.findById(id)
        .populate({
            path: 'orderItems',
            populate: {
                path: 'owner'
            }
        })
        .exec(cb);
};

cartSchema.methods.addOrderItems = async function (orderItems: Array<OrderItemModel>) {
    const cart = this;
    const addedOrderItem = await OrderItem.create(orderItems);
    addedOrderItem.forEach(orderItem => {
        cart.orderItems.push(orderItem);
    });
    return cart.save();
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart as typeof Cart & {getDetails: Function};