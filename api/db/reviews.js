import mongoose from 'mongoose';


const { Schema } = mongoose;

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

export const Reviews = mongoose.model('Reviews', reviews_schema);