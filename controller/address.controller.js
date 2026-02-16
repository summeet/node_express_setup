const catchAsync = require("../utils/catchAsync")
const addressService = require("../services/address.service")

const createAddress = catchAsync(async (req, res, next) => {
    const address = await addressService.createAddress(req.body)
    res.send({ address })
})

const updateAddress = catchAsync(async (req, res, next) => {
    const address = await addressService.updateAddress(req.body)
    res.send({ address })
})

const deleteAddress = catchAsync(async (req, res, next) => {
    await addressService.deleteAddress(req.params.id)
    res.send({ message: "Address deleted successfully" })
})

const getAddressById = catchAsync(async (req, res, next) => {
    const address = await addressService.getAddressById(req.params.id)
    res.send({ address })
})

const getAddressesByUserId = catchAsync(async (req, res, next) => {
    const addresses = await addressService.getAddressesByUserId(req.params.userId)
    res.send({ addresses })
})

const updateDefaultAddress = catchAsync(async (req, res, next) => {
    const { userId, addressId } = req.body
    const address = await addressService.updateDefaultAddress(userId, addressId)
    res.send({ address })
})

const getDefaultAddress = catchAsync(async (req, res) => {
    const address = await addressService.getDefaultAddress(req.params.userId)
    res.send({ address })
})

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById,
    getAddressesByUserId,
    updateDefaultAddress,
    getDefaultAddress
}
