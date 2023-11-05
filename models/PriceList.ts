import mongoose, { Schema, models, Document } from 'mongoose';
import { IProduct } from './Product';

export interface IPriceList extends Document {
    priceListName: string;
    prices: object;
}

const priceListSchema: Schema = new Schema({
    priceListName: {
        type: String,
        required: true,
    },
    prices: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        price: {
            type: Number,
            default: 0
        },
    }],
});

const PriceList = models.PriceList || mongoose.model<IPriceList>('PriceList', priceListSchema);

export default PriceList;
