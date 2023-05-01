/**
 * @swagger
 * components:
 *   securitySchemes:
 *    BasicAuth:
 *      type: http
 *      scheme: basic
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *   schemas:
 *     Get_Reviews:
 *       type: object
 *       required:
 *         - title
 *         - rating
 *         - text
 *         - photos
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of review
 *         photos:
 *           type: array
 *           items:
 *              type: string
 *           description: Photo names of review
 *         title:
 *           type: string
 *           description: Title of review
 *         rating:
 *           type: integer
 *           description: Title of review
 *         text:
 *           type: string
 *           description: Text of review
 *         product:
 *           type: string
 *           description: ID of product review referenced is
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was registered
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was registered
 *       example:
 *           - _id: 6411a817faa25ce123821101
 *             title: free top g
 *             rating: 5
 *             text: '12'
 *             product: 63dd32529d27b9fc6ee5980c
 *             photos:
 *             - 1678878743728-pixeltrue-plan.png
 *             createdAt: '2023-03-15T11:12:23.735Z'
 *             updatedAt: '2023-03-15T11:12:23.735Z'
 *             __v: 0
 *           - _id: 6410a783c8cf38f31cfd93c6
 *             title: asd
 *             rating: 5
 *             text: "¹¹2¹"
 *             product: 63dd32529d27b9fc6ee5980c
 *             photos:
 *             - 1678813059830-800px-Mendeleev's_1869_periodic_table.svg.png
 *             createdAt: '2023-03-14T16:57:39.852Z'
 *             updatedAt: '2023-03-14T16:57:39.852Z'
 *             __v: 0
 */

import {Reviews} from '../db/reviews';

export async function add_review(req, res) {
  const {id} = req.params;
  const {title, rating, text} = req.body;

  if (title && rating && text && req.files) {
    const filename = req.files.map(item => item.filename);

    const new_review = await Reviews.create({
      title: title,
      rating: rating,
      text: text,
      photos: filename,
      product: id,
    });

    return res.json(new_review);
  } else {
    res.status(400).json('not_all_fields');
  }
}

export async function get_reviews(req, res) {
  const {id} = req.params;

  const reviews = await Reviews.find({product: id}).sort({
    createdAt: 'descending',
  });

  return res.json(reviews);
}
