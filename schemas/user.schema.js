const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 9
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

/**
 * check if email is taken
 * @param {string} email 
 * @param {ObjectId} excludeUserId 
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}


const User = mongoose.model('user', UserSchema)

module.exports = User