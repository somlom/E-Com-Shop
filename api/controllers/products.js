import { Router } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { products_schema } from "../db/schemas";


const products = Router();
const Products = mongoose.model('Products', products_schema);

products.get("/", asyncHandler(get_products));
products.post("/", asyncHandler(get_product_by_id))
products.post("/cart", asyncHandler(get_cart_items))
products.post("/add", asyncHandler(add_product))

async function get_cart_items(req, res) {
    const { data } = req.body;

    const value = await Products.find().where('_id').in(data).exec()

    const in_cart = [];

    data.map((item, i) => {
        in_cart.push({ ...value[i]._doc, quantity: item.quantity })
    })


    return res.json(in_cart)

}

async function get_product_by_id(req, res) {

    // req.headers.host  <-- get header host

    const { id } = req.body;

    return res.json(await Products.findById(id))
}

async function get_products(req, res) {
    return res.json(await Products.find())
}

async function add_product(req, res) {
    const { name, text, price } = req.body;


    try {
        const products = await Products.create({ text: text, name: name, price: price })
        return res.json(products)
    } catch (error) {
        // throw new Error("Not found.")
        res.status(401)
        // throw new Error(error);
        throw new Error("Not found.")
    }

}

export default products;