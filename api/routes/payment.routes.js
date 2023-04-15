/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
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
    set_order,
    get_orders,
    pay_for_item,
    pay_order,
    close_order,
} from '../controllers/payment'

export const payment = Router()

payment.post('/set_order', asyncHandler(set_order))

payment.get('/get_orders', asyncHandler(get_orders))

payment.get('/pay', asyncHandler(pay_order))
payment.post('/pay_for_item', asyncHandler(pay_for_item))

payment.get('/close_order/:order_id', asyncHandler(close_order))
