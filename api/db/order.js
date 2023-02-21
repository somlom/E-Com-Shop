import { Schema, Types, model } from 'mongoose';

import { Products } from "./products"


const orders_schema = new Schema({
    user: {
        type: Types.ObjectId,
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
                order: {
                    type: Types.ObjectId,
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


    const count_amount = () => {
        let count = 0;
        this.products.forEach(obj => {
            const found = populated.find(ttt => ttt.id === obj.id)
            count += obj.quantity * found.price
        });

        return Math.round(count * 100) / 100
    }

    this.amount = count_amount()
    next();
});

orders_schema.post(['updateOne', "findOneAndUpdate", "updateMany", "update"], async function (doc, next) {

    if (this.getUpdate().$set.products) {
        const order = await Orders.findOne({ products: this.getUpdate().$set.products })

        const populated = await Products.find({ _id: { $in: order.products.map(a => a._id) } })

        let count = 0;

        order.products.forEach((obj) => {
            const found = populated.find(ttt => ttt.id === obj.id)
            count += (obj.quantity * found.price)
        })

        await order.updateOne({ amount: count })

        next();
    } else {
        next();
    }
});

export const Orders = model('Orders', orders_schema);