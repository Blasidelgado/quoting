// pages/api/clients/delete_client.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import Client from '../../../../models/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'DELETE') {
        try {
            const clientId = req.query.id; // Extract client ID from the request URL params
            const deletedClient = await Client.findByIdAndDelete(clientId);

            if (deletedClient) {
                return res.status(200).json({ success: true, message: 'Client deleted successfully.' });
            } else {
                return res.status(400).json({ success: false, message: 'Client not found.' });
            }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
