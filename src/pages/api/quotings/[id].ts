import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import Quoting from '../../../../models/Quoting';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const requestedQuoting = await Quoting.findOne({ _id: id });

            if (!requestedQuoting) {
                return res.status(404).json({ error: 'Quoting not found' });
            }

            return res.status(200).json({ success: true, requestedQuoting });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        try {
            const { isCompleted } = req.body;

            // Validate isCompleted
            if (typeof isCompleted !== 'boolean') {
                return res.status(400).json({ error: 'Invalid request body' });
            }

            const updatedQuoting = await Quoting.findByIdAndUpdate(id, { isCompleted }, { new: true });

            if (!updatedQuoting) {
                return res.status(404).json({ error: 'Quoting not found' });
            }

            return res.status(200).json({ success: true, updatedQuoting });
        } catch (error) {
            console.error('Error updating quoting:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const deletedQuoting = await Quoting.findByIdAndDelete(id);

            if (!deletedQuoting) {
                return res.status(404).json({ error: 'Quoting not found' });
            }

            return res.status(200).json({ success: true, deletedQuoting });
        } catch (error) {
            console.error('Error deleting quoting:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
