import mongoose from 'mongoose';

const { Schema } = mongoose;

export const products_schema = new Schema({
    name: String, // String is shorthand for {type: String}
    text: String,
    price: Number,
}, {
    timestamps: true
});