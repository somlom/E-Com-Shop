import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Reviews } from "../db/reviews";
import { upload_photos } from "../lib/photo";
import { auth_middleware } from "../middlewares/auth_handler";


export const reviews = Router();

reviews.post("/add_review/:id", auth_middleware, upload_photos, asyncHandler(add_review))
reviews.get("/:id", asyncHandler(get_reviews))

async function add_review(req, res) {

    const { id } = req.params;
    const { title, rating, text } = req.body
    const filename = req.files.map((item) => item.filename)

    console.log(title, rating, text, filename)

    const new_review = await Reviews.create({ title: title, rating: rating, text: text, photos: filename, product: id })

    return res.json(new_review)
}

async function get_reviews(req, res) {

    const { id } = req.params;

    const reviews = await Reviews.find({ product: id })

    return res.json(reviews)
}