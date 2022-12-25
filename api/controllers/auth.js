import bcrypt from "bcryptjs";
import { Router } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { users_schema } from "../db/schemas";
import { get_token, verify_token } from "../functions/JWT";


const auth = Router();
const Users = mongoose.model('Users', users_schema);

auth.post("/login", asyncHandler(loginUser))
auth.post("/register", asyncHandler(registerUser))
auth.get("/check_token", asyncHandler(check_token))

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });

    if (user) {
        const hash = await bcrypt.compare(password, user.password);

        if (hash === true) {
            return res.json(get_token(user._id));
        }
        res.status(401)
        throw Error("Invalid credentials")
    }
    res.status(401)
    throw Error("Invalid credentials")
}

async function registerUser(req, res) {
    const { name, surname, email, password, password2 } = req.body;

    if (name && surname && name && email && password && password2){
        const user = await Users.findOne({ email: email })

        if (user) {
            res.status(401)
            throw Error("Sorry, but this e-mail address is already registered")
        }
        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(password, salt);
        const are_same = await bcrypt.compare(password2, hash);
        if (are_same === false) {
            res.status(401)
            throw Error("Invalid credentials")
        }
        const new_user = await Users.create({ email: email, password: hash, name: name, surname: surname });
        return res.json(get_token(new_user._id));
    }else{
        res.status(400)
        throw new Error("Please, fill all fields")
    }
}

async function check_token(req, res) {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1]
        const response = await verify_token(token)
        if (response.status === true) {
            return res.json({ response: response.status })
        } else {
            res.status(401)
            return res.json({ response: response.status })
        }

    } else {
        res.status(401)
        throw new Error("No token")
    }

}


export default auth;