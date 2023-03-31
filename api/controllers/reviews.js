/**
 * @swagger
 * components:
 *   schemas:
 *     Reviews:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { Reviews } from '../db/reviews'
import { upload_photos } from '../lib/files/photo'
import { auth_middleware } from '../middlewares/auth_handler'

export const reviews = Router()

reviews.post(
    '/add_review/:id',
    auth_middleware,
    upload_photos,
    asyncHandler(add_review)
)
reviews.get('/:id', asyncHandler(get_reviews))

async function add_review(req, res) {
    const { id } = req.params
    const { title, rating, text } = req.body

    if (title && rating && text && req.files) {
        const filename = req.files.map((item) => item.filename)

        const new_review = await Reviews.create({
            title: title,
            rating: rating,
            text: text,
            photos: filename,
            product: id,
        })

        return res.json(new_review)
    } else {
        res.status(400).json({ key: 'not_all_fields' })
    }
}

async function get_reviews(req, res) {
    const { id } = req.params

    const reviews = await Reviews.find({ product: id }).sort({
        createdAt: 'descending',
    })

    return res.json(reviews)
}
