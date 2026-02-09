const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("../constant/httpStatus")

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
        required: true,
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 9
    },
    dob: {
        type: Date,
        required: true
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

UserSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.post("save", function (err, doc, next) {
    if(err.name === "MongoServerError" && err.code === 11000) {
        next(new ApiError(httpStatus.BAD_REQUEST, "Email or contact already Exist!"))
    }
    next()
})


const User = mongoose.model('user', UserSchema)

module.exports = User