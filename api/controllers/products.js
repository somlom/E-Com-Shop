import { Router } from "express";
import mongoose from "mongoose";

import { products_schema } from "../db/schemas";


const products = Router();
const Products = mongoose.model('Products', products_schema);

products.get("/", get_products);
products.post("/", get_product_by_id)
products.post("/cart", get_cart_items)
products.post("/add", add_product)

export async function get_cart_items(req, res) {
    const { data } = req.body;

    const value = await Products.find().where('_id').in(data).exec()

    let i = 0;
    const in_cart = [];

    while (value.length > i) {

        in_cart.push({ ...value[i]._doc, quantity: data[i].quantity })
        i++;

    }

    // const arr = value.concat(data);
    const arr = [...value, ...data]
    console.log("render")
    console.log(arr)



    return res.json(in_cart)


}

export async function get_product_by_id(req, res) {

    // req.headers.host  <-- get header host

    const { id } = req.body;

    return res.json(await Products.findById(id))
}

export async function get_products(req, res) {
    return res.json(await Products.find())
}

export async function add_product(req, res, next) {
    const { name, text, price } = req.body;


    try {
        const products = await Products.create({ text: text, name: name, price: price })
        return res.json(products)
    } catch (error) {
        // throw new Error("Not found.")
        res.status(401)
        next(new Error(error))
    }

}

export default products;