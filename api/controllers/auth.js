import bcrypt from "bcryptjs/dist/bcrypt";
import { Router } from "express";
import mongoose from "mongoose";

import { users_schema } from "../db/sch1";

// FIX REGISTER!!!!
const auth = Router();
const Users = mongoose.model('Users', users_schema);

auth.post("/login", loginUser)
auth.post("/register", registerUser)

async function loginUser(req, res, next) {
    const { email, password } = req.body;

    const user = Users.findOne({ password: password });

    if (user.email === email) {
        const hash = bcrypt.compare(password, user.password);
        console.log(hash);
        if (hash === true) {
            return res.json(user);
        }
        next(new Error("Invalid credentials."));
        // throw new Error("Invalid credentials.")
    }
    // throw new Error("Invalid credentials 1.")
    next(new Error("Invalid credentials."));
}

async function registerUser(req, res, next) {
    const { email, password, password2 } = req.body;

    console.log(req.body)

    const user = await Users.findOne({ password: password })

    if (user?.email === email) {
        next(new Error("Invalid credentials."));
        // throw Error("Invalid credentials.")
    }
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    const are_same = await bcrypt.compare(password2, password);
    console.log(are_same)
    if (are_same !== true) {
        next(new Error("Invalid credentials."));
        // throw Error("Invalid credentials.")
    }
    const new_user = await Users.create({ email: email, password: hash });
    return console.log(new_user);
}


export default auth;