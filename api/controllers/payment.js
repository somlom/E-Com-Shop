const stripe = require('stripe')(process.env.STRIPE_SECRET);
import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Orders } from "../db/schemas";
import { auth_middleware } from "../middlewares/auth_handler";


const payment = Router();

payment.post("/create_order", auth_middleware, asyncHandler(create_order))
payment.put("/update_order", auth_middleware, asyncHandler(update_order))
payment.get("/get_orders", auth_middleware, asyncHandler(get_orders))
payment.get("/get_order", auth_middleware, asyncHandler(get_order))
payment.get("/pay", auth_middleware, asyncHandler(pay_order))

async function get_orders(req, res) {

    const user_order = await Orders.find({ user: req.user }).populate("products.product")

    return res.json(user_order)
}

async function get_order(req, res) {

    const user_order = await Orders.findOne({ user: req.user, open: true })
    const populated_order = await user_order.populate("products.product")
    return await res.json(populated_order)

}

async function create_order(req, res) {

    const { cart } = req.body;

    if (cart) {
        const user_order = await Orders.findOne({ user: req.user, open: true })

        if (user_order === null) {
            const order = await Orders.create({ user: req.user, products: cart, })
            return res.json(order)

        } else {
            if (cart === user_order.products) {
                return res.json(user_order)
            }
            user_order.products = cart;
            await user_order.save()

            return res.json(user_order)
        }
    } else {
        res.status(301)
        throw new Error("Empty order")
    }
}

async function update_order(req, res) {

    const { address } = req.body;

    if (address) {
        const doc = await Orders.findOne({ user: req.user })
        doc.address = address;
        await doc.save();
        return res.json(doc)
    } else {
        res.status(301)
        throw new Error("Please, add your address")
    }
}

async function pay_order(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const YOUR_DOMAIN = 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: "price_1MOffqB2CYhq6UCmsVN6fbN1",
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    
    return res.json(session.url);
}

export default payment;