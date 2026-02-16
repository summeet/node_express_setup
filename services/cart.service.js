const Cart = require("../schemas/cart.schema")
const Product = require("../schemas/product.schema")
const ApiError = require("../utils/ApiError")

const addCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    const cart = await Cart.findOne({ userId })
    if (!cart) {
        const newCart = new Cart({
            userId,
            items: [{
                productId,
                quantity,
                price: product.price
            }]
        })
        await newCart.save()
        await newCart.populate('items.productId')
        return newCart
    }
    const item = cart.items.find(item => item.productId.toString() === productId)
    if (item) {
        item.quantity += quantity
        item.price = product.price
    } else {
        cart.items.push({
            productId,
            quantity,
            price: product.price
        })
    }
    await cart.save()
    await cart.populate('items.productId')
    return cart
}

const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('items.productId')
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }
    return cart
}

const updateCart = async (userId, productId, quantity) => {
    const cart = await getCart(userId)
    const item = cart.items.find(item => item.productId._id.toString() === productId)

    if (!item) {
        throw new ApiError(404, "Item not found in cart")
    }
    item.quantity = quantity
    item.price = item.quantity * item.price
    await cart.save()
    await cart.populate('items.productId')
    return cart
}

const deleteCart = async (userId, productId) => {
    const cart = await getCart(userId)
    const item = cart.items.find(item => item.productId._id.toString() === productId)
    if (!item) {
        throw new ApiError(404, "Item not found in cart")
    }
    cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
    await cart.save()
    await cart.populate('items.productId')
    return cart
}

const clearCart = async (userId) => {
    const cart = await getCart(userId)
    cart.items = []
    await cart.save()
    await cart.populate('items.productId')
    return cart
}



module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteCart,
    clearCart
}