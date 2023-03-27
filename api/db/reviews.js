import { Schema, Types, model } from 'mongoose'

const reviews_schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add your TITLE'],
        },
        rating: {
            type: Number,
            required: [true, 'Please add your STARS'],
        },
        text: {
            type: String,
            required: [true, 'Please add TEXT'],
        },
        product: {
            type: Types.ObjectId,
            ref: 'Products',
        },
        user: {
            type: Types.ObjectId,
            ref: 'Users',
        },
        photos: {
            type: [String],
            required: [true, 'Please add PHOTO'],
        },
    },
    {
        timestamps: true,
    }
)

export const Reviews = model('Reviews', reviews_schema)
