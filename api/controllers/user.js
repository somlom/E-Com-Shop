import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Users } from "../db/users";


export const user_router = Router();

user_router.get("/", asyncHandler(getUser))

async function getUser(req, res) {

    const user = await Users.findById(req.user)
    
    if (user) {
        return res.json({ email: user.email, name: user.name, surname: user.surname, createdAt: user.createdAt });
    } else {
        return res.status(404)
    }
}
