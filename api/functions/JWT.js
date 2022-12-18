import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { users_schema } from "../db/schemas";


const Users = mongoose.model('Users', users_schema);

export const verify_token = async (token) => {
    if (token) {
        const decoded = jwt.verify(token, "secret")
        const user = await Users.findOne({ email: decoded.email })
        if (decoded.email === user.email) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export const get_token = (email) => {
    const coded = jwt.sign({ email: email }, "secret", { expiresIn: '1h' })
    console.log(coded)
    return coded
}