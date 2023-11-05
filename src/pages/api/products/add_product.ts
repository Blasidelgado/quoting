// pages/api/products/add_product.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product, { IProduct } from '../../../../models/Product';
import PriceList from '../../../../models/PriceList';
import mongoose from 'mongoose';

// ... (imports and other code)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase(); // Connect to MongoDB database

    if (req.method === 'POST') {
        try {
            const { productName, stock }: { productName: string, stock: number } = req.body;

            // Validate request body
            if (!productName) {
                return res.status(400).json({ error: 'Product name is required.' });
            }

            // Reject duplicated product
            const productExist = await Product.findOne({ productName });
            if (productExist) {
                return res.status(409).json({ error: 'Product already exists' });
            }

            // Create new product
            const newProduct: IProduct = new Product({
                productName,
                stock,
            });

            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                // Save new product
                await newProduct.save({ session });

                // Fetch all price lists
                const allLists = await PriceList.find();

                // Update all price lists
                const updatedLists = await Promise.all(
                    allLists.map(async (list) => {
                        list.prices.push({ productId: newProduct._id, price: 0 });
                        await list.save({ session });
                        return list;
                    })
                );

                // Commit the transaction
                await session.commitTransaction();
                session.endSession();

                // Return success response
                return res.status(201).json({
                    success: true,
                    newProduct,
                });
            } catch (error) {
                // Abort the transaction in case of errors
                await session.abortTransaction();
                session.endSession();

                console.error('Error adding product:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.error('Error adding product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

