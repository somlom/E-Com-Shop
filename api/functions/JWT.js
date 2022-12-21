import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { users_schema } from "../db/schemas";


const Users = mongoose.model('Users', users_schema);

export const verify_token = async (token) => {
    if (token) {
        try {
            const decoded = jwt.verify(token, "secret")
            const user = await Users.findById(decoded._id)
            if (user) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }

    } else {
        return false
    }

}

export const get_token = (_id) => {
    const coded = jwt.sign({ _id }, "secret", { expiresIn: '1h' })
    console.log(coded)
    return coded
}