import * as mongoose from 'mongoose';
import User, {UserModel} from './User';

export type OrderItemModel = mongoose.Document & {
    title: string,
    quantity: number,
    user: UserModel
};


const orderItemSchema = new mongoose.Schema({
    title: String,
    quantity: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

//
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;