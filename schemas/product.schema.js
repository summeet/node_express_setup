const mongoose = require("mongoose")

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

const ProductSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: String,
    isAvailable: {
        type: Boolean,
        default: true
    },
    foodType: {
        type: String,
        enum: ["VEG", "NON_VEG", "BOTH"],
        required: true,
        index: true
    },
    variants: [variantSchema],
    toppings: [toppingSchema],
    status: {
        type: String,
        enum: ["active", "inactive", "out_of_stock"],
        default: "active",
        index: true
    },
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }

}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema)
