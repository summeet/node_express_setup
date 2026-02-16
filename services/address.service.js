const Address = require("../schemas/address.schema")
const ApiError = require("../utils/ApiError")
const httpStatus = require("../constant/httpStatus")

const createAddress = async (addressData) => {
    const address = new Address(addressData)
    return await address.save()
}

const updateAddress = async (addressData) => {
    const address = await Address.findByIdAndUpdate(addressData.id, addressData, { new: true })
    if (!address) {
        throw new ApiError(httpStatus.NOT_FOUND, "Address not found")
    }
    return address
}

const deleteAddress = async (id) => {
    const address = await Address.findByIdAndDelete(id)
    if (!address) {
        throw new ApiError(httpStatus.NOT_FOUND, "Address not found")
    }
    return address
}

const getAddressById = async (id) => {
    const address = await Address.findById(id)
    if (!address) {
        throw new ApiError(httpStatus.NOT_FOUND, "Address not found")
    }
    return address
}

const getAddressesByUserId = async (userId) => {
    const addresses = await Address.find({ userId }).sort({ isDefault: -1, createdAt: -1 })
    return addresses
}

const updateDefaultAddress = async (userId, addressId) => {
    // First, unset all default addresses for this user
    await Address.updateMany({ userId }, { isDefault: false })

    // Then set the specified address as default
    const address = await Address.findByIdAndUpdate(
        addressId,
        { isDefault: true },
        { new: true }
    )

    if (!address) {
        throw new ApiError(httpStatus.NOT_FOUND, "Address not found")
    }

    return address
}

const getDefaultAddress = async (userId) => {
    const address = await Address.findOne({ userId, isDefault: true })
    if (!address) {
        throw new ApiError(httpStatus.NOT_FOUND, "Default address not found")
    }
    return address
}

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById,
    getAddressesByUserId,
    updateDefaultAddress,
    getDefaultAddress
}