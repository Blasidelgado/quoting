import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '../../../../models/Product';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            // Retrieve all lists from the database
            const priceLists = await PriceList.find();

            const products = await Product.find();

            // Return the list of lists in the response
            return res.status(200).json({
                priceLists,
            });
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
