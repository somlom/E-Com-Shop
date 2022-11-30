import { Router } from "express";
import mongoose from "mongoose";

import { products_schema } from "../db/schemas";


const products = Router();
const Products = mongoose.model('Products', products_schema);

products.get("/", get_products);
products.post("/", get_product_by_id)

products.post("/cart", get_cart_items)
products.post("/add", add_product)

async function get_cart_items(req, res) {
    const { id } = req.body;

    const response = await Products.find().where('_id').in(id).exec();

    return res.json(response)
}

async function get_product_by_id(req, res) {

    // req.headers.host  <-- get header host

    const { id } = req.body;

    const response = await Products.findById(id)

    return res.json(response)
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
        return res.json(error)
    }

}

export default products;