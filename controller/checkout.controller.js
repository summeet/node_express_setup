const catchAsync = require("../utils/catchAsync");

const createCheckout = catchAsync(async (req, res, next) => {
    const checkout = await checkoutService.createCheckout(req.body)
    res.send({ checkout })
})

const getCheckoutById = catchAsync(async (req, res, next) => {
    const checkout = await checkoutService.getCheckoutById(req.params.id)
    res.send({ checkout })
})

const updateCheckoutStatus = catchAsync(async (req, res, next) => {
    const checkout = await checkoutService.updateCheckoutStatus(req.params.id, req.body)
    res.send({ checkout })
})

const getCheckoutByUserId = catchAsync(async (req, res, next) => {
    const checkouts = await checkoutService.getCheckoutByUserId(req.user.id)
    res.send({ checkouts })
})

const getCheckoutByStatus = catchAsync(async (req, res, next) => {
    const checkouts = await checkoutService.getCheckoutByStatus(req.query.status)
    res.send({ checkouts })
})

const deleteCheckout = catchAsync(async (req, res, next) => {
    await checkoutService.deleteCheckout(req.params.id)
    res.send({ message: "checkout deleted" })
})


module.exports = {
    createCheckout,
    getCheckoutById,
    updateCheckoutStatus,
    getCheckoutByUserId,
    getCheckoutByStatus,
    deleteCheckout
}