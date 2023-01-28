import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Products } from "../db/schemas";
import { upload_photos } from "../lib/photo";
import { Stripe_Api } from "../lib/stripe";


const products = Router();

products.get("/", asyncHandler(get_products));
products.get("/:id", asyncHandler(get_product_by_id))
products.post("/cart", asyncHandler(get_cart_items))
products.post("/add", upload_photos, asyncHandler(add_product))
products.post("/edit", upload_photos, asyncHandler(edit_product))

async function get_cart_items(req, res) {

    const { data } = req.body;

    const value = await Products.find({ _id: { $in: await data.map(a => a._id) } })

    if (value) {
        const in_cart = []

        data.map((item) => {

            const found = value.find(x => x.id === item._id)
            if (found) {
                found.quantity = parseInt(item.quantity)
                in_cart.push(found)
            }

        })

        return res.json(in_cart)

    } else {
        return res.json([])
    }
}

async function get_product_by_id(req, res) {

    const { id } = req.params;

    try {
        return res.json(await Products.findById(id))
    } catch (error) {
        return res.json(null)
    }
}

async function get_products(req, res) {
    return res.json(await Products.find())
}

async function add_product(req, res) {

    const { name, text, price, quantity } = req.body;

    const filename = req.files.map((item) => item.filename)

    try {
        const stripe = new Stripe_Api();

        const product = await Products.create({ text: text, name: name, price: price, photos: filename, quantity: quantity })
        stripe.create_product(product.id, name, price, filename);

        if (!(stripe || product)) {
            res.status(400)
            throw new Error(error)
        }

        return res.json(product)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
}

async function edit_product(req, res) {
    const { text, name, price, quantity, id } = req.body;

    const filename = req.files.map((item) => item.filename)

    const item = await Products.findById(id)
    if (item) {
        try {
            const product = await Products.findByIdAndUpdate(id, { text: text, name: name, price: price, photos: filename, quantity: quantity })
            if (product) {

                const stripe = new Stripe_Api();

                stripe.update_product(id, name, filename)
                return res.json(products)
            }
            throw new Error(error)
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    } else {
        throw new Error("error")
    }

}

export default products;