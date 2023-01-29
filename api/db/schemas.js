import mongoose from 'mongoose';


const { Schema } = mongoose;

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
    // tags: {
    //     type: [String],
    //     index: true
    // },
    text: {
        type: String,
        required: [true, "Please add TEXT"],
        dropDups: true
    },
    price: {
        // type: mongoose.Types.Decimal128,
        type: Number,
        required: [true, "Please add PRICE"],
    },
    quantity: {
        type: Number,
        required: [true, "Please add QUANTITY"],
    },
    technical_data: {
        type: [
            {
                header: {
                    type: String,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                }
            }
        ],
        required: true
    }
}, {
    timestamps: true
});

const reviews_schema = new Schema({
    title: {
        type: String,
        required: [true, "Please add your NAME"],
    },
    stars: {
        type: String,
        required: [true, "Please add your SURNAME"],
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    },
    password: {
        type: String,
        required: [true, "Please add your PASSWORD"],
    },
}, {
    timestamps: true
});

const users_schema = new Schema({
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

const orders_schema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please add your USER_ID"],
    },
    payed: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Products',
                    unique: false
                },
                quantity: {
                    type: Number,
                }
            }
        ]
    }
}, {
    timestamps: true
})

export const Users = mongoose.model('Users', users_schema);
export const Orders = mongoose.model('Orders', orders_schema);
export const Products = mongoose.model('Products', products_schema);
export const Reviews = mongoose.model('Reviews', reviews_schema);