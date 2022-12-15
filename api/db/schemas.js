import mongoose from 'mongoose';


const { Schema } = mongoose;

export const products_schema = new Schema({
    name: {
        type: String,
        required: [true, "Please add NAME"],
        unique: true, 
        dropDups: true,
        index: true,

    }, // String is shorthand for {type: String}
    text: {
        type: String,
        required: [true, "Please add TEXT"],
        unique: true, dropDups: true
    },
    price: {
        type: Number,
        required: [true, "Please add PRICE"],
    },
}, {
    timestamps: true
});

export const users_schema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String
    },
    // products: {}
    email: {
        type: String,
        required: [true, "Please add your email"],
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
    },
}, {
    timestamps: true
});