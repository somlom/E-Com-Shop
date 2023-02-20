import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Products } from "../db/products";
import { delete_photos } from "../lib/photo";
import { create_product, update_product } from "../lib/stripe";


export const admin = Router();

admin.post("/add", asyncHandler(add_product))
admin.post("/edit", asyncHandler(edit_product))

async function add_product(req, res) {

    const { name, text, price, quantity, technical_data } = req.body;

    try {
        const filename = req.files.map((item) => item.filename)

        const product = await Products.create({ text: text, name: name, price: price, photos: filename, quantity: quantity, technical_data: technical_data })
        await create_product(product.id, name, price, filename)

        return res.json()

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
}

async function edit_product(req, res) {
    const { text, name, price, quantity, id, technical_data, remaining_photos } = req.body;

    const filename = req.files.map((item) => item.filename)

    const item = await Products.findById(id)


    if (item) {

        try {

            const difference = item.photos.filter(data => !remaining_photos?.includes(data, 0))
            delete_photos(difference)

            const files_to_update = [...filename, ...(item.photos.filter(data => remaining_photos?.includes(data)))]

            await item.updateOne({ text: text, name: name, price: price, photos: files_to_update, quantity: quantity, technical_data: technical_data }).then(
                async () => await update_product(id, name, filename, price)
            )

            return res.json()

        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    } else {
        res.status(400)
        throw new Error("No items specified")
    }
}