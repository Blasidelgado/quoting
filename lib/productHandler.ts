import mongoose from "mongoose";
import Product, {IProduct} from "../models/Product";
import PriceList from "../models/PriceList";

export async function handleProductUpdate(productId: string, updateData: any): Promise<IProduct | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            throw new Error('Product not found');
        }

        // Update price lists containing the updated product
        await PriceList.updateMany(
            { 'prices.productId': updatedProduct._id },
            { $set: { 'prices.$.price': updateData.price } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return updatedProduct;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

export async function handleProductDelete(productId: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete the product
        await Product.findByIdAndDelete(productId, { session });

        // Update price lists to remove the deleted product
        await PriceList.updateMany(
            { 'prices.productId': new mongoose.Types.ObjectId(productId) }, 
            { $pull: { prices: { productId: new mongoose.Types.ObjectId(productId) } } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}