import type { NextApiRequest, NextApiResponse } from "next";
import PriceList from "../../../../models/PriceList";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === "GET") {

        try {
            const priceListsResponse = await PriceList.find();

            return res.status(200).json(priceListsResponse);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    if (req.method === "POST") {
        if (!req.body.priceListName || !req.body.prices) {
            return res.status(400).json({ error: "Incomplete data provided" });
        }
        
        // Gather necessary information from request
        const { priceListName, prices} = req.body;        

        try {
            // Reject duplicated list names
            const listExists = await PriceList.findOne({ priceListName });
            if (listExists) {
                return res.status(409).json({ error: "Client already exists" });
            }
            
            // Add price list in DB
            const newList = await PriceList.create({
                priceListName,
                prices,
            });

            // Respond with success and newly created price list
            return res.status(201).json({
                success: true,
                newList
            });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
