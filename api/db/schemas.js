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
    photos: {
        type: [String],
        required: [true, "Please add PHOTO"]
    },
    tags: {
        type: [String],
        index: true
    },
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
        required: [true, "Please add your NAME"],
    },
    surname: {
        type: String,
        required: [true, "Please add your SURNAME"],
    },
    address: {
        type: String,
        // required: [true, "Please add your ADDRESS"],
    },
    products: {
        type: [orders_schema],
        ref: 'Orders'
    },
    email: {
        type: String,
        required: [true, "Please add your EMAIL"],
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Please add your PASSWORD"],
    },
}, {
    timestamps: true
});

export const orders_schema = new Schema({
    user: {
        type: users_schema,
        ref: 'Users'
    },
    product: {
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: true
});

export const payment_schema = new Schema({
    user_id: {
        type: String,
        required: [true, "Please add your USER_ID"],
        index: true
    },
    address: {
        type: Object,
    },
    products: {
        type: Array,
        // ref: 'Products',
        unique: false
    },
})