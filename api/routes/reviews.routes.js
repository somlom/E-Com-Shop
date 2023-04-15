/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: The Reviews managing API
 * /reviews/{id}:
 *   get:
 *     summary: Get all reviews to product by id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The book response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Get_Reviews'
 *       404:
 *         description: The book was not found
 *   post:
 *    summary: Update the book by the id
 *    tags: [Reviews]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Get_Reviews'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get_Reviews'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */



import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { auth_middleware } from '../middlewares/auth_handler'
import { upload_photos } from '../lib/files/photo'
import { add_review, get_reviews } from '../controllers/reviews'

export const reviews = Router()

reviews.post(
    '/:id',
    auth_middleware,
    upload_photos,
    asyncHandler(add_review)
)
reviews.get('/:id', asyncHandler(get_reviews))
