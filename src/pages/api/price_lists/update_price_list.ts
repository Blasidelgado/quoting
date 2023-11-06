import type { NextApiRequest, NextApiResponse } from 'next';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'PUT') { 
        const priceListID = req.query.id as string;

        console.log('Price List ID:', priceListID);

        try {
            
            const updatedList = await PriceList.findByIdAndUpdate(priceListID, req.body, { new: true });

            if (!updatedList) {
                return res.status(404).json({ error: 'Price list not found' });
            }

            return res.status(200).json({ success: true, updatedList });
        } catch (error) {
            console.error('Error updating price list:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
