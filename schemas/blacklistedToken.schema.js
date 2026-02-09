const mongoose = require("mongoose")

const BlacklistedToken = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: '1s' }
    }
})

module.exports = mongoose.model('BlacklistedToken', BlacklistedToken)