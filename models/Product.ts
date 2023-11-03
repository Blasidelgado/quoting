import mongoose, { Schema, Document, models } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  stock: number;
}

const productSchema: Schema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
