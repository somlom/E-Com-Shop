/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
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

import { auth_middleware } from '../middlewares/auth_handler'
import {
    adminLogin,
    check_token,
    loginUser,
    registerUser,
    requestResetUser,
    resetUser,
} from '../controllers/auth'

export const auth = Router()

auth.post('/login', asyncHandler(loginUser))
auth.post('/register', asyncHandler(registerUser))

auth.post('/request_reset', asyncHandler(requestResetUser))
auth.post('/reset/:token', asyncHandler(resetUser))

auth.get('/check_token', asyncHandler(check_token))

auth.get('/admin', auth_middleware, asyncHandler(adminLogin))
