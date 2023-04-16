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
 *         description: The reviews response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Get_Reviews'
 *       404:
 *         description: The reviews were not found
 *   post:
 *    summary: Create review for the product
 *    security:
 *      - BearerAuth: []
 *    tags: [Reviews]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             properties:
 *               photos:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: Photo names of review
 *               title:
 *                 type: string
 *                 description: Title of review
 *               rating:
 *                 type: integer
 *                 description: Title of review
 *               text:
 *                 type: string
 *                 description: Text of review
 *    responses:
 *      200:
 *        description: The review was updated
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of review
 *               photos:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: Photo names of review
 *               title:
 *                 type: string
 *                 description: Title of review
 *               rating:
 *                 type: integer
 *                 description: Title of review
 *               text:
 *                 type: string
 *                 description: Text of review
 *               product:
 *                 type: string
 *                 description: ID of product review referenced is
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 description: The date the user was registered
 *               updatedAt:
 *                 type: string
 *                 format: date
 *                 description: The date the user was registered
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Some error happened
 */

import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { auth_middleware } from '../middlewares/auth_handler'
import { upload_photos } from '../lib/files/photo'
import { add_review, get_reviews } from '../controllers/reviews'

export const reviews = Router()

reviews.post('/:id', auth_middleware, upload_photos, asyncHandler(add_review))
reviews.get('/:id', asyncHandler(get_reviews))
