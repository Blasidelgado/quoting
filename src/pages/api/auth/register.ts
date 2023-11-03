import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { IUser } from "../../../../types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToDatabase().catch(err => res.json(err));

    if (req.method === "POST") {

        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: "Data is missing" });
        }    

        const userExists = await User.findOne({ name });

        if (userExists) {
            return res.status(409).json({ error: "User Already exists" });
        }
        else {
            if (password.length < 6)
                return res.status(409).json({ error: "Password should be 6 characters long" });

            const hashedPassword = await hash(password, 12);

            User.create({
                name,
                password: hashedPassword
            });

            return res.status(201).json({
                success: true,
                name
            });
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};

export default handler