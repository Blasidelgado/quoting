import type { NextApiRequest, NextApiResponse } from 'next';
import Client from '../../../../models/client';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const requestedClient = await Client.findOne({ _id: id });

            if (!requestedClient) {
                return res.status(404).json({ error: 'Client not found' });
            }

            return res.status(200).json({ success: true, requestedClient });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        const { clientName, CUIT, address, condicionIVA } = req.body

        // Check the required fields were submitted
        if (clientName.length < 4 || !CUIT || !address || !condicionIVA) {
            return res.status(400).json({ error: 'Missing update data' });
        }

        try {
            // Take need-to-update property/ies and client id to update
            const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedClient) {
                return res.status(404).json({ error: 'Client not found' });
            }

            return res.status(200).json({ success: true, updatedClient });
        } catch (error) {
            console.error('Error updating client:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const deletedClient = await Client.findByIdAndDelete(id);

            if (deletedClient) {
                return res.status(200).json({ success: true, message: 'Client deleted successfully.' });
            } else {
                return res.status(400).json({ success: false, message: 'Client not found.' });
            }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
