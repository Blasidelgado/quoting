import type { NextApiRequest, NextApiResponse } from "next";
import Client from "../../../../models/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      try {
        const clients = await Client.find();
        return res.status(200).json(clients);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
};
