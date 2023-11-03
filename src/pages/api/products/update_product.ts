import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'PUT') { // Allow PUT method only
        const productID = req.query.id as string; // Take id from request query params

        if (req.body.productName.length < 4) {
            return res.status(400).json({ error: 'Invalid product' });
        }

        try {
            // Take need-to-update property/ies and product id to update
            const updatedProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true });

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
