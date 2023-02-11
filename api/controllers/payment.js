import { Router } from "express";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

import { Orders, Users } from "../db/schemas";
import Mailer from "../lib/mailer";
import { create_stripe_session } from "../lib/stripe";
import { auth_middleware } from "../middlewares/auth_handler";


const payment = Router();

payment.post("/set_order", auth_middleware, asyncHandler(set_order));

payment.get("/get_orders", auth_middleware, asyncHandler(get_orders));
payment.get("/get_order", auth_middleware, asyncHandler(get_order));

payment.get("/pay", auth_middleware, asyncHandler(pay_order));
payment.post("/pay_for_item", auth_middleware, asyncHandler(pay_for_item));

payment.get("/close_order/:order_id", auth_middleware, asyncHandler(close_order));


async function get_orders(req, res) {
    const user_order = await Orders.find({ user: req.user }).populate("products._id")

    return res.json(user_order)
}

async function get_order(req, res) {

    const user_order = await Orders.findOne({ user: req.user, open: true })
    const populated_order = await user_order.populate("products._id")

    return res.json(populated_order)
}

async function set_order(req, res) {

    const { cart } = req.body;

    if (cart) {
        const user_order = await Orders.findOne({ user: req.user, open: true })

        if (!user_order) {
            const order = await Orders.create({ user: req.user, products: cart })
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

async function pay_for_item(req, res) {

    const product = req.body
    product._id = product.id

    const order = await (await Orders.create({ user: req.user, products: [product] })).populate("user")

    const session = await create_stripe_session(order, order.id, order.user.email)

    order.stripe_order_id = session.id
    await order.save()

    session.status === true ? res.status(200) : res.status(400);

    return res.json(session);
}

async function pay_order(req, res) {

    const order = await Orders.findOne({ user: req.user, open: true }).populate("user");

    const session = await create_stripe_session(order, order.id, order.user.email)

    order.stripe_order_id = session.id
    await order.save()

    if (session.status) {
        return res.json(session);
    } else {
        return res.json(session.data);
    }
}

async function close_order(req, res) {

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const { order_id } = req.params;

    const order = await Orders.findById(order_id)

    const session = await stripe.checkout.sessions.retrieve(
        order.stripe_order_id, { apiKey: process.env.STRIPE_SECRET }
    );

    const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent, { apiKey: process.env.STRIPE_SECRET }
    );

    if (paymentIntent.status === "succeeded") {
        if (order.payed === false) {
            order.payed = true
            await order.save()
            const user = await Users.findById(req.user)
            const mailer = new Mailer()

            mailer.send_email(user.email, "Hi. Your order is placed", "hello", { name: user.name })
            mailer.send_email(process.env.ADMIN_EMAIL, "NEW ORDER", "hello", { name: user.name })

            return res.json(session);
        } else {
            return res.status(304)
        }
    } else {
        return res.status(404)
    }
}

export default payment;