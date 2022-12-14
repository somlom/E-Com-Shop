import bcrypt from "bcryptjs";
import { Router } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { users_schema } from "../db/sch1";
import { send_email } from "../mailer";


const auth = Router();
const Users = mongoose.model('Users', users_schema);

auth.post("/login", asyncHandler(loginUser))
auth.post("/register", asyncHandler(registerUser))
auth.post("/reset", asyncHandler(resetUser))

async function loginUser(req, res) {
    const { email, password } = req.body;
    // send_email("trashcancereal@gmail.com", "TEST SNUS BRE", "<h1>BRE TEST<h1>")

    const user = await Users.findOne({ email: email });

    if (user) {
        const hash = await bcrypt.compare(password, user.password);

        if (hash === true) {
            return res.json(user);
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
    return res.json(new_user);
}

async function resetUser(req, res) {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    if (user === true) {
        return res.json(user)
    }
}


export default auth;