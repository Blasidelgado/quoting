import { connectToDatabase } from "../../../../lib/mongodb";
import Quoting from "../../../../models/Quoting";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const quotings = await Quoting.find();
            return res.status(200).json({ success: true, quotings });
        } catch (error) {
            console.error('Error fetching quotings:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
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
    }
    else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
