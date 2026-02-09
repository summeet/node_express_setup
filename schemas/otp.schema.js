const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({

    // email or phone or userId
    identifier: {
        type: String,  
        required: true
    },

    // LOGIN, SIGNUP, RESET_PASSWORD
    purpose: {
        type: String,
        required: true
    },
    otpHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    }
}, { timestamps: true })