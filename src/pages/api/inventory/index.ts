import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/Product";
import PriceList from "../../../../models/PriceList";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../lib/mongodb";
import { IProduct } from "../../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === "GET") {
        try {
            const products = await Product.find();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    if (req.method === 'POST') {
        try {
            const { productName, stock }: { productName: string, stock: number } = req.body;

            // Validate request body
            if (!productName) {
                return res.status(400).json({ error: 'Product name is required.' });
            }

            // Start a database transaction
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                // Create new product
                const newProduct: IProduct = new Product({
                    productName,
                    stock,
                });

                // Save new product
                await newProduct.save({ session });

                // Fetch all priceLists
                const allLists = await PriceList.find();

                // Update all priceLists
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
                    newProduct
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
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
