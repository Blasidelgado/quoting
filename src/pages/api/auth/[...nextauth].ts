import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { compare } from "bcryptjs";
import { IUser } from "../../../../types";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                name: {label: "Name", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                await connectToDatabase().catch(err => {
                    throw new Error (err)
                });

                const user = await User.findOne({
                    name: credentials?.name,
                }).select("+password");

                if(!user) {
                    throw new Error("Invalid credentials");
                }

                const isValidPassword = await compare(credentials!.password, user.password);

                if(!isValidPassword) {
                    throw new Error("Invalid credentials")
                }

                return user;
            },
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async({token, user}) => {
            user && (token.user = user);
            return token;
        },
        session: async({ session, token }) => {
            const user = token.user as IUser;
            session.user = user;
            return session;
        }
    }
}

export default NextAuth(options);