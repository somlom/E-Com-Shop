const stripe = require('stripe')(process.env.STRIPE_SECRET);
import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Orders } from "../db/schemas";
import { auth_middleware } from "../middlewares/auth_handler";


const payment = Router();

payment.post("/set_order", auth_middleware, asyncHandler(set_order))
payment.get("/get_orders", auth_middleware, asyncHandler(get_orders))
payment.get("/get_order", auth_middleware, asyncHandler(get_order))
payment.get("/pay", auth_middleware, asyncHandler(pay_order))

async function get_orders(req, res) {

    const user_order = await Orders.find({ user: req.user }).populate("products._id")

    return res.json(user_order)
}

async function get_order(req, res) {

    const user_order = await Orders.findOne({ user: req.user, open: true })
    const populated_order = await user_order.populate("products._id")
    return await res.json(populated_order)

}

async function set_order(req, res) {

    const { cart } = req.body;

    if (cart) {
        const user_order = await Orders.findOne({ user: req.user, open: true })

        if (user_order === null) {
            const order = await Orders.create({ user: req.user, products: cart, })
            return res.json(order)

        } else {
            if (cart === user_order.products) {
                return res.json(user_order)
            } else {
                user_order.products = cart;
                await user_order.save()
            }

            return res.json(user_order)
        }
    } else {
        res.status(301)
        throw new Error("Empty order")
    }
}

async function pay_order(req, res) {

    const order = await Orders.findOne({ user: req.user })

    const search = {
        data: [],
        ids: []
    }
    order.products.map(obj => {
        search.data.push({ id: obj.id, quantity: obj.quantity })
        search.ids.push(obj.id)
    });

    const products = await stripe.products.list({
        ids: search.ids
    });

    const new_arr = search.data.map((item, i) => {
        if (item.id === products.data[i].id) {
            return { quantity: item.quantity, price: products.data[i].default_price }
        }
    })

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['DE'] },
        line_items: new_arr,
        customer: req.user,
        mode: 'payment',
        success_url: `http://localhost:3000?success=true`,
        cancel_url: `http://localhost:3000?canceled=true`,
    });

    return res.json(session.url);
}

export default payment;