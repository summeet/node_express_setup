const ApiError = require("../utils/ApiError")   
const CheckoutSchema = require("../schemas/checkout.schema")
const mongoose = require("mongoose")

const createCheckout = async (checkoutData) => {
    const checkout = new CheckoutSchema(checkoutData)
    await checkout.save()
    return checkout
}

const getCheckoutById = async (id) => {
    const checkout = await CheckoutSchema.findById(id)
    if (!checkout) {
        throw new ApiError(404, "checkout not found")
    }
    return checkout
}

const updateCheckoutStatus = async (id, status) => {
    const checkout = await CheckoutSchema.findByIdAndUpdate(id, { status }, { new: true })
    if (!checkout) {
        throw new ApiError(404, "checkout not found")
    }
    return checkout
}

const getCheckoutByUserId = async (userId) => {
    const checkouts = await CheckoutSchema.find({ userId })
    return checkouts
}

const getCheckoutByStatus = async (status) => {
    const checkouts = await CheckoutSchema.find({ status })
    return checkouts
}

module.exports = {
    createCheckout,
    getCheckoutById,
    updateCheckoutStatus,
    getCheckoutByUserId,
    getCheckoutByStatus
}