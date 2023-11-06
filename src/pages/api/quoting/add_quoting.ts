import type { NextApiRequest, NextApiResponse } from 'next';
import Quoting from '../../../../models/Quoting';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'POST') {
        const { number, date, client, concepts, total } = req.body;

        try {
            const quoting = new Quoting({
                number,
                date,
                client,
                concepts,
                total,
            });

            await quoting.save();

            return res.status(200).json({ success: true, quoting });
        } catch (error) {
            console.error('Error adding quoting:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
