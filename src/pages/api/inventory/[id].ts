import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '../../../../models/Product';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';
import mongoose from 'mongoose';
import { handleProductUpdate, handleProductDelete } from '../../../../lib/productHandler';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const requestedProduct = await Product.findOne({ _id: id });

            if (!requestedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json({ success: true, requestedProduct });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        const productId = req.query.id as string;

        try {
            const updatedProduct = await handleProductUpdate(productId, req.body);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json({ success: true, updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        const productId = req.query.id as string;

        try {
            await handleProductDelete(productId);
            return res.status(200).json({ success: true, message: 'Product deleted successfully.' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}