const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const CheckoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    items: [ItemSchema],
    pricing: {
        subTotal: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        tax: {
            type: Number,
            default: 0
        },
        deliveryFee: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            required: true
        }
    },
    deliveryAddress: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        addressLine: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: String,
        pinCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "card", "upi", "wallet"],
        required: true
    },
    payment: {
        status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        transactionId: String,
        gateway: String
    },
    status: {
        type: String,
        enum: ["pending", "paid", "expired"],
        default: "pending",
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    }
}, { timestamps: true })

module.exports = CheckoutSchema