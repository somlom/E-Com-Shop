/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user:
 *   get:
 *     summary: Create a new book
 *     tags: [User]
 *     responses:
 *       304:
 *         description: The existing user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  message: Wrong token
 *
 */

import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { getUser } from '../controllers/user'

export const user_router = Router()

user_router.get('/', asyncHandler(getUser))
