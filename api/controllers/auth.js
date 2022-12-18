import bcrypt from "bcryptjs";
import { Router } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { users_schema } from "../db/schemas";
import { send_email } from "../mailer";
import { get_token, verify_token } from "../functions/JWT";


const auth = Router();
const Users = mongoose.model('Users', users_schema);

auth.post("/login", asyncHandler(loginUser))
auth.post("/register", asyncHandler(registerUser))
auth.post("/reset", asyncHandler(resetUser))
auth.post("/check_token", asyncHandler(check_token))

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });

    if (user) {
        const hash = await bcrypt.compare(password, user.password);

        if (hash === true) {
            return res.json({ name: user.name, token: get_token(user.email) });
        }
        res.status(401)
        throw Error("Invalid credentials")
    }
    res.status(401)
    throw Error("Invalid credentials")
}

async function registerUser(req, res) {
    const { email, password, password2 } = req.body;

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
    const new_user = await Users.create({ email: email, password: hash });
    return res.json(get_token(new_user.email));
}

async function resetUser(req, res) {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    if (user === true) {
        send_email(user.email, "Password reset", "<h1>sus</h1>")
        return res.json(user)
    }
}

async function check_token(req, res) {
    const { token } = req.body;
    return res.json({ response: await verify_token(token) })
}


export default auth;