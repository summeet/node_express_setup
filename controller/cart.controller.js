const catchAsync = require("../utils/catchAsync");
const cartService = require("../services/cart.service");

const addCart = catchAsync(async (req, res, next) => {
    const { userId, productId, quantity } = req.body
    const cart = await cartService.addCart(userId, productId, quantity)
    res.send({ cart })
})

const getCart = catchAsync(async (req, res, next) => {
    const { userId } = req.params
    const cart = await cartService.getCart(userId)
    res.send({ cart })
})

const updateCart = catchAsync(async (req, res, next) => {
    const { userId, productId, quantity } = req.body
    const cart = await cartService.updateCart(userId, productId, quantity)
    res.send({ cart })
})

const deleteCart = catchAsync(async (req, res, next) => {
    const { userId, productId } = req.body
    const cart = await cartService.deleteCart(userId, productId)
    res.send({ cart })
})

const clearCart = catchAsync(async (req, res, next) => {
    const { userId } = req.params
    const cart = await cartService.clearCart(userId)
    res.send({ cart })
})

module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteCart,
    clearCart
}