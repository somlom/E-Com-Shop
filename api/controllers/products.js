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

export async function get_cart_items(req, res) {

    const { data } = req.body;

    const value = await Products.find().where('product').in(data).exec()

    if (data) {
        const in_cart = []

        data.map((item) => {

            const found = value.find(x => x._id.toString() === (item.product || item._id))
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
            console.log({...req.body})
            const products = await Products.findByIdAndUpdate(req.body._id, {...req.body})
            return res.json(products)
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }else{
        throw new Error("error")
    }


}

export default products;