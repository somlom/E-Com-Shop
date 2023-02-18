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

    console.log(this._id)

    const populated = await Products.find({ _id: { $in: this.products.map(a => a._id) } })

    let count = 0;


    this.products.map((obj) => {

        const found = populated.find(ttt => ttt.id === obj.id)
        count += obj.quantity * found.price

    })

    this.amount = count
    next();
});

orders_schema.pre('updateOne', async function (next) {
    // console.log(this.findOne({ open: true }))
    // const aaa = this.getUpdate().$set.count = 1337
    // console.log(aaa)
    console.log("-----------------------------------")
    console.log(this.where({ open: true }))
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