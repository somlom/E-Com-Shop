import { Schema, model } from 'mongoose';


const users_schema = new Schema({
    name: {
        type: String,
        required: [true, "Please add your NAME"],
    },
    surname: {
        type: String,
        required: [true, "Please add your SURNAME"],
    },
    email: {
        type: String,
        required: [true, "Please add your EMAIL"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add your PASSWORD"],
    },
}, {
    timestamps: true
});

export const Users = model('Users', users_schema);