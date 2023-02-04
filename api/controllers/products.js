import { Router } from "express";
import asyncHandler from "express-async-handler";
import find from "lodash"

import { Products } from "../db/schemas";
import { upload_photos, delete_photos } from "../lib/photo";
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

    const in_cart = []

    data.map((item) => {
        const found = value.find(x => x.id === item._id)
        if (found) {
            found.quantity = parseInt(item.quantity)
            in_cart.push(found)
        }
    })

    return res.json(in_cart)

}

async function get_product_by_id(req, res) {

    const { id } = req.params;

    const product = await Products.findById(id)

    if (product) {
        return res.json(product)
    } else {
        return res.status(404);
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
        const stripe_instance = stripe.create_product(product.id, name, price, filename);

        if (stripe_instance && product) {

            return res.json(product)

        } else {
            res.status(400)
            throw new Error("error")
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
}

async function edit_product(req, res) {
    const { text, name, price, quantity, id, technical_data, remaining_photos } = req.body;

    const filename = req.files.map((item) => item.filename)


    // PLAN WHAT THAT SHIT DOES

    const item = await Products.findById(id)

    if (remaining_photos) {
        const difference = item.photos.filter(data => !remaining_photos.includes(data, 0))
        delete_photos(difference)
    }

    if (item) {

        try {

            const files_to_update = [...filename, ...(item.photos.filter(data => remaining_photos.includes(data)))]

            const product = await item.updateOne({ text: text, name: name, price: price, photos: files_to_update, quantity: quantity, technical_data: technical_data })
            if (product) {

                const stripe = new Stripe_Api();

                stripe.update_product(id, name, filename)
                return res.json(product)
            } else {
                res.status(400)
                throw new Error(product)
            }
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    } else {
        res.status(400)
        throw new Error("No items specified")
    }

}

export default products;