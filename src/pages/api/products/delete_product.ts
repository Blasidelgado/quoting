import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'DELETE') {
        try {
            const productID = req.query.id; // Extract product ID from the request URL params
            const deletedProduct = await Product.findByIdAndDelete(productID);

            if (deletedProduct) {
                return res.status(200).json({ success: true, message: 'Product deleted successfully.' });
            } else {
                return res.status(400).json({ success: false, message: 'Product not found.' });
            }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
