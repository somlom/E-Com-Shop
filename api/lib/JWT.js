import { verify, sign } from "jsonwebtoken";

import { Users } from "../db/schemas";


export const verify_token = async (token = "") => {

    try {
        const decoded = verify(token, "secret")
        const user = await Users.findById(decoded._id)
        if (user) {
            return { status: true, data: user._id }
        } else {
            return { status: false, data: "Invalid token" }
        }
    } catch (error) {
        return { status: false, data: error }
    }
}

export const get_token = (_id, expiresIn = "") => {
    return sign({ _id }, "secret", expiresIn.length === 0 ? { expiresIn: '1h' } : { expiresIn: expiresIn })
}