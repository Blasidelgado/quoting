import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '../../../../models/Product';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';
import mongoose from 'mongoose';

async function updateProductAndPriceLists(productId: string, updateData: any): Promise<IProduct | null> {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'PUT') {
        const productId = req.query.id as string;

        try {
            const updatedProduct = await updateProductAndPriceLists(productId, req.body);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json({ success: true, updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
