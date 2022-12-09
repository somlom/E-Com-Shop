import mongoose from 'mongoose';


const { Schema } = mongoose;

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
        // unique: true,
        // index: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
    },
}, {
    timestamps: true
});