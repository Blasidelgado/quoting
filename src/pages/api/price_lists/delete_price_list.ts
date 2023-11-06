import type { NextApiRequest, NextApiResponse } from 'next';
import PriceList from '../../../../models/PriceList';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'DELETE') {
        const priceListID = req.query.id as string;

        console.log(priceListID);

        try {
            const deletedList = await PriceList.findByIdAndDelete(priceListID);

            console.log(deletedList);

            if (!deletedList) {
                return res.status(404).json({ error: 'Price list not found' });
            }

            return res.status(200).json({ success: true, deletedList });
        } catch (error) {
            console.error('Error deleting price list:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
