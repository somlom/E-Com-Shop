import mongoose from 'mongoose';

import { Products } from "./products"


const { Schema } = mongoose;

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

orders_schema.post(['updateOne', "findOneAndUpdate", "updateMany", "update"], async function (doc, next) {

    const product = await Orders.findOne({ stripe_order_id: this.getUpdate().stripe_order_id })

    let count = 0;

    const populated = await Products.find({ _id: { $in: product.products.map(a => a._id) } })

    product.products.map((obj) => {
        console.log(obj)
        const found = populated.find(ttt => ttt.id === obj.id)
        count += obj.quantity * found.price

    })

    this.getUpdate().$set.amount = count
    console.log(count)
    // ----------------------------------------------------------
    // const populated = await Products.find({ _id: { $in: this.products.map(a => a._id) } })

    // let count = 0;

    // this.products.map((obj) => {

    //     const found = populated.find(ttt => ttt.id === obj.id)
    //     count += obj.quantity * found.price

    // })


    // this.amount = count
    next();
});

export const Orders = mongoose.model('Orders', orders_schema);