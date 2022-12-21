import { Router } from "express";
import mongoose from "mongoose";
import path from 'path';
import jwt from "jsonwebtoken";

import { payment_schema, users_schema } from "../db/schemas";
import asyncHandler from "express-async-handler";
import { get_cart_items } from "./products";


const payment = Router();


payment.post("/create_order", asyncHandler(create_order))
payment.put("/update_order", asyncHandler(update_order))
payment.post("/get_order", asyncHandler(get_order))

async function get_order(req, res) {

    const Users = mongoose.model('Users', users_schema);
    const Payment = mongoose.model('Payment', payment_schema);

    const { token } = req.body;

    const user = await Users.findById(jwt.verify(token, "secret")._id)

    const user_order = await Payment.findOne({ user_id: user._id })
    req.body.data=user_order.products

    return get_cart_items(req, res)
}

async function create_order(req, res) {

    const Users = mongoose.model('Users', users_schema);
    const Payment = mongoose.model('Payment', payment_schema);

    const { token, cart } = req.body;

    const user = await Users.findById(jwt.verify(token, "secret")._id)

    const user_order = await Payment.findOne({ user_id: user._id })
    // console.log(user)
    if (user_order.length > 0) {
        user_order.products = [...user_order.products, cart]
        // user_order.save()

        return res.json(user_order)
    } else {
        const order = await Payment.create({ user_id: user._id, products: cart })
        return res.json(order)
    }
    // console.log(order)

}

async function update_order(req, res) {

    const Users = mongoose.model('Users', users_schema);
    const Payment = mongoose.model('Payment', payment_schema);

    const { address, token } = req.body;
    // console.log(user)

    const user = await Users.findById(jwt.verify(token, "secret")._id)
    console.log(user)

    const doc = await Payment.findOne({user_id: user._id})
    doc.address = address;
    await doc.save();
    return res.json(doc)

}

export default payment;