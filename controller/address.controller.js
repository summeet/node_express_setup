const catchAsync = require("../utils/catchAsync")   

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

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById
}
