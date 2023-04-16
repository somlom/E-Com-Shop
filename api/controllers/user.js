/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: E-mail of user
 *         name:
 *           type: string
 *           description: Name of user
 *         surname:
 *           type: string
 *           description: Surname of user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was registered
 *       example:
 *           email: feini@at.aa
 *           name: Luigi
 *           surname: Andreas
 *           createdAt: 2023-02-02T17:28:10.780Z
 */

import { Users } from '../db/users'

export async function getUser(req, res) {
    const user = await Users.findById(req.user)

    if (user) {
        return res.json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            createdAt: user.createdAt,
        })
    } else {
        return res.status(404)
    }
}
