import type { NextApiRequest, NextApiResponse } from "next";
import Client from "../../../../models/Client";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const clients = await Client.find();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    if (!req.body.clientName || !req.body.CUIT || !req.body.address || !req.body.condicionIVA) {
      return res.status(400).json({ error: "Incomplete data provided" });
    }

    try {
      // Gather necessary information from request
      const { clientName, CUIT, address, condicionIVA } = req.body;

      // Reject duplicated clients
      const clientExists = await Client.findOne({ clientName });
      if (clientExists) {
        return res.status(409).json({ error: "Client already exists" });
      }

      // Add client in DB
      const newClient = await Client.create({
        clientName,
        CUIT,
        address,
        condicionIVA
      });

      // Respond with success and newly created client
      return res.status(201).json({
        success: true,
        newClient
      });
    } catch (error) {
      console.error(error)
      // Handle database-related errors
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
