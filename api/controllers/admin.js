import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Products } from "../db/schemas";
import { upload_photos, delete_photos } from "../lib/photo";
import { create_product, update_product } from "../lib/stripe";


const admin = Router();

admin.post("/add", upload_photos, asyncHandler(add_product))
admin.post("/edit", upload_photos, asyncHandler(edit_product))

async function add_product(req, res) {

    const { name, text, price, quantity, technical_data } = req.body;

    const filename = req.files.map((item) => item.filename)

    try {

        const product = await Products.create({ text: text, name: name, price: price, photos: filename, quantity: quantity, technical_data: technical_data })
        const stripe_instance = await create_product(product.id, name, price, filename);

        if (stripe_instance.status && product) {

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

    const item = await Products.findById(id)

    const difference = item.photos.filter(data => !remaining_photos?.includes(data, 0))
    delete_photos(difference)

    if (item) {

        try {

            const files_to_update = [...filename, ...(item.photos.filter(data => remaining_photos?.includes(data)))]

            const product = await item.updateOne({ text: text, name: name, price: price, photos: files_to_update, quantity: quantity, technical_data: JSON.parse(technical_data) })
            if (product) {

                const updated = await update_product(id, name, filename, price)
                return res.json(updated)
            } else {
                res.status(400)
                throw new Error("product wasnt created")
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

export default admin;