import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';
import mongoose from 'mongoose';

async function deleteProductAndPriceLists(productId: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete the product
        await Product.findByIdAndDelete(productId, { session });

        // Update price lists to remove the deleted product
        await PriceList.updateMany(
            { 'prices.productId': new mongoose.Types.ObjectId(productId) }, // Use new keyword here
            { $pull: { prices: { productId: new mongoose.Types.ObjectId(productId) } } }, // And here
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'DELETE') {
        const productId = req.query.id as string;

        try {
            await deleteProductAndPriceLists(productId);
            return res.status(200).json({ success: true, message: 'Product deleted successfully.' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
