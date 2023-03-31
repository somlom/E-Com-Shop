/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { Products } from '../db/products'

export const products = Router()

products.get('/', asyncHandler(get_products))
products.get('/:id', asyncHandler(get_product_by_id))

products.post('/cart', asyncHandler(get_cart_items))
products.post('/check_cart', asyncHandler(check_cart))

async function get_cart_items(req, res) {
    const { data } = req.body

    if (typeof data === Array) {
        const value = await Products.find({
            _id: {
                $in: data
                    .map((a) => {
                        return a._id
                    })
                    .filter((a) => a),
            },
        })

        const in_cart = []

        data.map((item) => {
            const found = value.find((x) => x.id === item._id)
            if (found) {
                found.quantity = parseInt(item.quantity)
                return in_cart.push(found)
            }
        })
        return res.json(in_cart)
    } else {
        return res.json([])
    }
}

async function check_cart(req, res) {
    const { data } = req.body

    let quantity = 0

    if (typeof data === Array) {
        const value = await Products.find({
            _id: {
                $in: data
                    .map((a) => {
                        return a._id
                    })
                    .filter((a) => a),
            },
        })

        // create find files function

        const updated_arr = data.filter((obj) =>
            value.find((x) => x.id === obj._id)
        )

        updated_arr.forEach((obj) => (quantity += parseInt(obj.quantity)))
        return res.json({ cart: Array.from(updated_arr), quantity: quantity })
    } else {
        return res.json({ cart: [], quantity: 0 })
    }
}

async function get_product_by_id(req, res) {
    const { id } = req.params

    const product = await Products.findById(id)

    if (product) {
        return res.json(product)
    } else {
        return res.status(404)
    }
}

async function get_products(req, res) {
    return res.json(await Products.find())
}
