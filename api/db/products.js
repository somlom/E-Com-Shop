import { Schema, Types, model } from 'mongoose';


const products_schema = new Schema({
    name: {
        type: String,
        required: [true, "Please add NAME"],
        unique: true,
        dropDups: true,
        index: true,

    },
    photos: {
        type: [String],
        required: [true, "Please add PHOTO"]
    },
    text: {
        type: String,
        required: [true, "Please add TEXT"],
        dropDups: true
    },
    price: {
        type: Types.Decimal128,
        required: [true, "Please add PRICE"],
    },
    quantity: {
        type: Number,
        required: [true, "Please add QUANTITY"],
    },
    technical_data: {
        type: String,
        required: true,
    },
    reviews: {
        type: [Types.ObjectId],
        ref: "Reviews"
    }
}, {
    timestamps: true
});

export const Products = model('Products', products_schema);