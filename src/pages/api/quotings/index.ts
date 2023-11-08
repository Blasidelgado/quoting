import { connectToDatabase } from '../../../../lib/mongodb';
import Quoting from '../../../../models/Quoting';
import Product from '../../../../models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';
import PriceList from '../../../../models/PriceList';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const {isCompleted} = req.query;

        if (isCompleted) {
            const requestedQuotings = await Quoting.find({isCompleted: isCompleted});
            return res.status(200).json(requestedQuotings);
        }

        try {
            const quotings = await Quoting.find();
            return res.status(200).json({ success: true, quotings });
        } catch (error) {
            console.error('Error fetching quotings:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'POST') {
        const { number, date, client, priceList, concepts } = req.body;

        // Validating received JSON data
        if (!number || typeof number !== 'string' || !date || typeof date !== 'string' || !client || !priceList || !Array.isArray(concepts)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Validate quoting number does not already exist
        const existingQuoting = await Quoting.findOne({ number: number });
        if (existingQuoting) {
            return res.status(400).json({ error: 'Quoting number already exists' });
        }

        let quotingTotal = 0;
        const quotingConcepts = [];
        
        try {
            for (const concept of concepts) {
                if (!concept.product || typeof concept.product !== 'string' || !concept.quantity || typeof concept.quantity !== 'number') {
                    return res.status(400).json({ error: 'Invalid concept in the request body' });
                }

                // Product and stock validation
                const product = await Product.findById(concept.product);
                if (!product) {
                    return res.status(400).json({ error: `Product with ID ${concept.product} not found` });
                }

                const newStock = product.stock - concept.quantity
                if (newStock < 0) {
                    return res.status(400).json({ error: `Not enough stock for product with ID ${concept.product}` });
                }

                // Get the price list
                const usedPriceList = await PriceList.findById(priceList);
                if (!usedPriceList) {
                    return res.status(400).json({ error: `Price list with ID ${priceList} not found` });
                }

                // Check for the product to be priced
                const priceListItem = usedPriceList.prices.find(item => item.productId.toString() === concept.product);
                if (!priceListItem) {
                    return res.status(400).json({ error: `Price not found for product with ID ${concept.product} in the selected price list` });
                }

                // Calculate subtotals and sum total
                const subtotal = concept.quantity * priceListItem.price;
                quotingTotal += subtotal;

                // Update our helper array
                quotingConcepts.push({
                    product: concept.product,
                    quantity: concept.quantity,
                    subtotal: subtotal,
                });
            }
            
            // Quoting creation
            const quoting = new Quoting({
                number: number,
                date: date,
                client: client,
                priceList: priceList,
                concepts: quotingConcepts,
                total: quotingTotal,
                isCompleted: false, // Quoting is created as pending to complete or reject
            });

            await quoting.save();

            return res.status(200).json({ success: true, quoting });
        } catch (error) {
            return res.status(500).json({ error: 'Error processing the request' });
        }
    }
    else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
