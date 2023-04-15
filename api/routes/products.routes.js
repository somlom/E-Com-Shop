/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
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

import {
    check_cart,
    get_cart_items,
    get_product_by_id,
    get_products,
} from '../controllers/products'

export const products = Router()

products.get('/', asyncHandler(get_products))
products.get('/:id', asyncHandler(get_product_by_id))

products.post('/cart', asyncHandler(get_cart_items))
products.post('/check_cart', asyncHandler(check_cart))
