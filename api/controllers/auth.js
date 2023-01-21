import bcrypt from "bcryptjs";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authenticator } from "otplib"

import { Users } from "../db/schemas";
import { get_token, verify_token } from "../lib/JWT";


const auth = Router();

auth.post("/login", asyncHandler(loginUser))
auth.post("/register", asyncHandler(registerUser))
auth.get("/check_token", asyncHandler(check_token))

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (email && password) {

        const user = await Users.findOne({ email })

        if (user) {
            const hash = await bcrypt.compare(password, user.password);

            if (hash === true) {
                return res.json(get_token(user._id));
            } else {
                res.status(401)
                throw Error("Invalid credentials")
            }
        } else {
            res.status(401)
            throw Error("Invalid credentials")
        }
    } else {
        res.status(401)
        throw Error("Please, fill all fields")
    }
}

async function registerUser(req, res) {
    const { name, surname, email, password, password2 } = req.body;

    if (name && surname && email && password && password2) {

        const user = await Users.findOne({ email })

        if (user) {
            res.status(401)
            throw Error("Sorry, but this e-mail address is already registered")
        }
        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(password, salt);
        const are_same = await bcrypt.compare(password2, hash);
        if (!are_same) {
            res.status(401)
            throw Error("Invalid credentials")
        }
        const new_user = await Users.create({ email: email, password: hash, name: name, surname: surname });
        return res.json(get_token(new_user._id));
    } else {
        res.status(400)
        throw new Error("Please, fill all fields")
    }
}

async function check_token(req, res) {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1]
        const response = await verify_token(token)
        if (response.status === true) {
            return res.json(response.status)
        } else {
            return res.status(401).json(response.status)
        }

    } else {
        res.status(401)
        throw new Error("No token")
    }
}

async function resetUser(req, res) {

    const { email } = req.body;

    const user = await Users.findOne({ email: email })

    if (user) {
        return res.json({ a: "a" })
    } else {
        throw new Error("Sorry, but there is no user with this e-mail")
    }
}

// async function adminLogin(req, res) {

//     const { token } = req.body;
//     const secret = authenticator.generate()

//     authenticator.keyuri()

// }


export default auth;