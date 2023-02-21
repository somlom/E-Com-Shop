import { Router } from "express";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

import { Orders } from "../db/order";
import { Users } from "../db/users";
import Mailer from "../lib/mailer";
import { create_stripe_session } from "../lib/stripe";


export const payment = Router();

payment.post("/set_order", asyncHandler(set_order));

payment.get("/get_orders", asyncHandler(get_orders));

payment.get("/pay", asyncHandler(pay_order));
payment.post("/pay_for_item", asyncHandler(pay_for_item));

payment.get("/close_order/:order_id", asyncHandler(close_order));


async function get_orders(req, res) {
    const order = await Orders.find({ user: req.user, payed: true }).populate("products._id").sort({updatedAt: "descending"})
    return res.json(order)
}

async function set_order(req, res) {

    const { cart } = req.body;

    if (cart) {
        const order = await Orders.findOne({ user: req.user, open: true })
        if (order) {

            if (cart === order.products) {
                return res.json(order)

            } else {
                await order.updateOne({ products: cart })
                return res.json()
            }

        } else {
            const order = await Orders.create({ user: req.user, products: cart })
            return res.json(order)

        }
    } else {
        res.status(301)
        throw new Error("Empty order")
    }
}

async function pay_for_item(req, res) {

    const product = req.body
    product._id = product.id

    const order = await Orders.create({ user: req.user, products: [product] })

    if (order) {

        const user = await Users.findById(req.user)
        if (user) {

            const session = await create_stripe_session(order, order.id, user.email)

            if (session.status === true) {
                await order.updateOne({ stripe_order_id: session.id })

                return res.status(200).json(session);

            } else {
                return res.status(400).json({ key: "smth_went_wrong" });
            }
        } else {
            return res.status(400).json({ key: "login_to_proceed" })
        }
    } else {
        return res.status(400).json({ key: "smth_went_wrong" })
    }
}

async function pay_order(req, res) {

    const order = await Orders.findOne({ user: req.user, open: true }).populate("user");

    const session = await create_stripe_session(order, order.id, order.user.email)

    await order.updateOne({ stripe_order_id: session.id })

    if (session.status === true) {
        return res.json(session);
    } else {
        return res.status(400);
    }
}

async function close_order(req, res) {

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const { order_id } = req.params;

    const order = await Orders.findById(order_id)

    const session = await stripe.checkout.sessions.retrieve(
        order.stripe_order_id, { apiKey: process.env.STRIPE_SECRET }
    );

    const popp = await order.populate("products._id")
    if (session.status === "complete") {
        if (order.payed === false && order.open === true) {

            await order.updateOne({ open: false, payed: true })


            const mailer = new Mailer()

            mailer.send_email(session.customer_email, "Ihre Bestellung ist in der Verarbeitung", "order", { name: session.shipping_details.name })
            mailer.send_email(process.env.ADMIN_EMAIL, "NEW ORDER", "order_alert", { customer_details: session.customer_details, address:session.customer_details.address })

            return res.json(order);
        } else {
            return res.status(304).json(popp)
        }
    } else {
        return res.status(404).json()
    }
}
