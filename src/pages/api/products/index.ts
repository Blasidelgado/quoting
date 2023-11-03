// pages/api/products/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '../../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Retrieve all products from the database
            const products: IProduct[] = await Product.find();

            // Return the list of products in the response
            return res.status(200).json(products);
        } catch (error) {
            console.error(error);
            // Handle database-related errors
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // If request method is not GET, return method not allowed error
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};
