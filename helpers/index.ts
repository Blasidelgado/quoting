import { signIn } from "next-auth/react"
import { LoginUserParams } from "../types"

export const loginUser = async ({name, password}: LoginUserParams) => {
    const res = await signIn("credentials", {
        redirect: false,
        name,
        password
    });

    return res;
};