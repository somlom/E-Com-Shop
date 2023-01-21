import asyncHandler from 'express-async-handler';

import { verify_token } from "../lib/JWT"


export const auth_middleware = asyncHandler(async (req, res, next) => {

    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = await verify_token(token)
            req.user = decoded.data
            
            next()
        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    } else {
        res.status(401)
        throw new Error("No token")
    }
})