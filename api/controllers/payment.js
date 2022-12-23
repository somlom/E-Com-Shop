import { Router } from "express";
import mongoose from "mongoose";

import { Orders } from "../db/schemas";
import asyncHandler from "express-async-handler";
import { get_cart_items } from "./products";
import { auth_middleware } from "../middlewares/auth_handler";


const payment = Router();


payment.post("/create_order", auth_middleware, asyncHandler(create_order))
payment.put("/update_order", auth_middleware, asyncHandler(update_order))
payment.get("/get_order", auth_middleware, asyncHandler(get_order))

async function get_order(req, res) {
    // await Products.find().where('_id').in(data).exec()

    const user_order = await Orders.findOne({ user: req.user }).populate("products.product")
    req.body.data = user_order.products

    return res.json(user_order)
}

async function create_order(req, res) {

    const { cart } = req.body;

    const user_order = await Orders.findOne({ user: req.user })

    if (user_order === null) {
        const order = await Orders.create({ user: req.user, products: cart  })
        return res.json(order)

    } else {
        user_order.products = cart;
        await user_order.save()

        return res.json(user_order)
    }
}

async function update_order(req, res) {

    const { address } = req.body;

    const doc = await Orders.findOne({ user: req.user })
    doc.address = address;
    await doc.save();
    return res.json(doc)
}

export default payment;