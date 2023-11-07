import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import PriceList from '../../../../models/PriceList';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const requestedPriceList = await PriceList.findOne({ _id: id });

            if (!requestedPriceList) {
                return res.status(404).json({ error: 'Client not found' });
            }

            return res.status(200).json({ success: true, requestedPriceList });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        // Check for non numeric prices
        const {prices} = req.body

        const validPrices = prices.every(item => !isNaN(parseFloat(item.price)));

        if (!validPrices) {
            return res.status(400).json({ error: 'Prices must be numbers' });
        }

        try {    
            const updatedList = await PriceList.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedList) {
                return res.status(404).json({ error: 'Price list not found' });
            }

            return res.status(200).json({ success: true, updatedList });
        } catch (error) {
            console.error('Error updating price list:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const deletedList = await PriceList.findByIdAndDelete(id);

            if (!deletedList) {
                return res.status(404).json({ error: 'Price list not found' });
            }

            return res.status(200).json({ success: true, deletedList });
        } catch (error) {
            console.error('Error deleting price list:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
