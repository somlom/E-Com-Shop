import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { Users } from "../db/schemas";


export const verify_token = async (token) => {
    if (token) {
        try {
            const decoded = jwt.verify(token, "secret")
            const user = await Users.findById(decoded._id)
            if (user) {
                return {status: true, data: user._id}
            } else {
                return {status: false, data: "Invalid token (no user)"}
            }
        } catch (error) {
            return {status: false, data: error}
        }

    } else {
        return {status: false, data: "No token"}
    }

}

export const get_token = (_id) => {
    return jwt.sign({ _id }, "secret", { expiresIn: '1h' })
}