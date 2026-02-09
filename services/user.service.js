const mongoose = require("mongoose")
const User = require("../schemas/user.schema");
const ApiError = require("../utils/ApiError");
const httpStatus = require("../constant/httpStatus");


/**
 * Create a user
 * @param {Object} userBody 
 * @returns {Promise<User>}
 */
const create = async (userBody) => {
    if(await User.isEmailTaken(userBody.email)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    const user = await User.create({
        ...userBody,
        dob: new Date(userBody.dob)
    });
    return user
}

/**
 * 
 * @returns {Promise<User>}
 */
const queryUsers = async () => {
    const users = await User.find({})
    return users
}

/**
 * @param {Number} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    return user
}

/**
 * @param {Number} userId
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const updateUser = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if(updateBody.email && (await User.isEmailTaken(updateBody.email, userId))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    Object.assign(user, updateBody)
    await user.save()
    return user
}


/**
 * Delete a user
 * @param {ObjectId} userId 
 * @returns 
 */
const deleteUser = async (userId) => {
    const result = await User.deleteOne({ _id: userId })
    if (result.deletedCount === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    return result
}

const getUserByContact = async (contact) => {
    const result = await User.findOne({ contact })
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    return result
}

module.exports = {
    create,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByContact
}