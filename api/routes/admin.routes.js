/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
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

import { upload_photos } from '../lib/files/photo'
import { add_product, edit_product } from '../controllers/admin'

export const admin = Router()

admin.post('/add', upload_photos, asyncHandler(add_product))
admin.post('/edit', upload_photos, asyncHandler(edit_product))
