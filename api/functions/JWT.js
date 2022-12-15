import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { users_schema } from "../db/schemas";


const Users = mongoose.model('Users', users_schema);

export const verify_token = async (token) => {
    const decoded = jwt.verify(token, "secret")
    const user = await Users.findOne(decoded)
    return decoded === user.email ? true : false
}

export const get_token = (email) => {
    const coded = jwt.sign({ email: email }, "secret", { expiresIn: '1h' })
    console.log(coded)
    return coded
}