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
    text: {
        type: String,
        required: [true, "Please add TEXT"],
        dropDups: true
    },
    price: {
        type: mongoose.Types.Decimal128,
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
        required: [true, "Please add your TITLE"],
    },
    rating: {
        type: String,
        required: [true, "Please add your STARS"],
    },
    text: {
        type: String,
        required: [true, "Please add TEXT"],
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    },
    photos: {
        type: [String],
        required: [true, "Please add PHOTO"]
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
    stripe_order_id: {
        type: String
    },
    payed: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: true
    },
    amount: {
        type: Number,
        default: 0
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

orders_schema.pre('save', async function (next) {

    const populated = await Products.find({ _id: { $in: this.products.map(a => a._id) } })

    let count = 0;


    this.products.map((obj) => {

        const found = populated.find(ttt => ttt.id === obj.id)
        count += obj.quantity * found.price

    })

    this.amount = count
    next();
});

export const Users = mongoose.model('Users', users_schema);
export const Orders = mongoose.model('Orders', orders_schema);
export const Products = mongoose.model('Products', products_schema);
export const Reviews = mongoose.model('Reviews', reviews_schema);