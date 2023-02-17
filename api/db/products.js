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
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Products = mongoose.model('Products', products_schema);