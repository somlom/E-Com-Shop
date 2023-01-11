const stripe = require('stripe')(process.env.STRIPE_SECRET);
import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Products } from "../db/schemas";
import { upload_photo } from "../functions/photo";


const products = Router();

products.get("/", asyncHandler(get_products));
products.get("/:id", asyncHandler(get_product_by_id))
products.post("/cart", asyncHandler(get_cart_items))
products.post("/add", upload_photo, asyncHandler(add_product))
products.post("/edit", upload_photo, asyncHandler(edit_product))

// POST /products/cart
//
// Args: [{product: "sn34n3431n4134", quantity: 10}, {product: "s432d324134", quantity: 1}]
// Return : [
//     {
//         "_id": "63be7f496b0f2e23150f3a88",
//         "name": "Handwärmer LUX (50°)",
//         "photos": [
//             "1673428809125-19f9a574fcbc42d5cc5819da929acc1f.jpg"
//         ],
//         "tags": [],
//         "text": "Lux",
//         "price": 25,
//         "quantity": 1,
//         "createdAt": "2023-01-11T09:20:09.152Z",
//         "updatedAt": "2023-01-11T09:20:09.152Z",
//         "__v": 0
//     }
// ]
export async function get_cart_items(req, res) {

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

export async function get_product_by_id(req, res) {

    const { id } = req.params;

    try {
        return res.json(await Products.findById(id))
    } catch (error) {
        return res.json(null)
    }

}

export async function get_products(req, res) {
    return res.json(await Products.find())
}

export async function add_product(req, res) {

    const { name, text, price, quantity } = req.body;
    const { filename } = req.file;

    try {
        const products = await Products.create({ text: text, name: name, price: price, photos: [filename], quantity: quantity })
        if (products) {
            await stripe.products.create({
                id: products.id,
                name: products.name,
                default_price_data: {
                    currency: "EUR",
                    unit_amount_decimal: products.price.toString(),
                },
                shippable: true,
                url: "http://localhost:4000/" + products.id,
                images: [
                    "http://localhost:4000/img/" + filename
                ]
            });
        }
        return res.json(products)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
}

export async function edit_product(req, res) {

    // const { name, text, price, quantity } = req.body;
    // const { filename } = req.file;

    const item = await Products.findOne({ _id: req.body._id })
    if (item) {
        try {
            const products = await Products.findByIdAndUpdate(req.body._id, { ...req.body })
            return res.json(products)
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    } else {
        throw new Error("error")
    }


}

export default products;