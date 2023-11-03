// models/PriceList.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './Product';

export interface IPriceList extends Document {
  name: string;
  products: IProduct['_id'][];
}

const priceListSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const PriceList = mongoose.model<IPriceList>('PriceList', priceListSchema);

export default PriceList;
