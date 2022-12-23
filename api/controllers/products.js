import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Products } from "../db/schemas";
import { upload_photo } from "../functions/photo";


const products = Router();

products.get("/", asyncHandler(get_products));
products.get("/:id", asyncHandler(get_product_by_id))
products.post("/cart", asyncHandler(get_cart_items))
products.post("/add", upload_photo, asyncHandler(add_product))

export async function get_cart_items(req, res) {

    const { data } = req.body;

    const value = await Products.find().where('product').in(data).exec()


    if (value) {
        const in_cart = []

        data.map(item => {

            const found = value.find(x => x._id.toString() === item.product.toString())
            in_cart.push({...found._doc, quantity: parseInt(item.quantity)})

        })

        return res.json(in_cart)

    } else {
        return res.json([])
    }


}

async function get_product_by_id(req, res) {

    // req.headers.host  <-- get header host

    const { id } = req.params;

    return res.json(await Products.findById(id))
}

async function get_products(req, res) {
    return res.json(await Products.find())
}

async function add_product(req, res) {
    const { name, text, price } = req.body;
    const image = req.file.filename;

    try {
        const products = await Products.create({ text: text, name: name, price: price, photos: [image] })
        return res.json(products)
    } catch (error) {
        res.status(401)
        throw new Error("Not found.")
    }
}

const get_user_items = async (req, res) => {
    const { user_token } = req.authorization;
    return 0
}


export default products;