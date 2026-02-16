const ApiError = require("../utils/ApiError")
const Order = require("../schemas/order.schema")
const httpStatus = require("../constant/httpStatus")

const createOrder = async (orderData) => {
    const order = await Order.create(orderData)
    return order
}

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('items.productId')
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, "order not found")
    }
    return order
}

const updateOrderStatus = async (orderId, status) => {
    const order = await getOrderById(orderId)
    order.status = status
    await order.save()
    return order
}

const deleteOrder = async (orderId) => {
    const order = await getOrderById(orderId)
    await order.remove()
    return order
}

const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ userId })
        .populate('items.productId')
        .sort({ createdAt: -1 })
    return orders
}

const getOrdersByStatus = async (status) => {
    const orders = await Order.find({ status })
    return orders
}

const getOrdersByRestaurantId = async (restaurantId) => {
    const orders = await Order.find({ restaurantId })
    return orders
}

const getOrdersByRestaurantIdAndStatus = async (restaurantId, status) => {
    const orders = await Order.find({ restaurantId, status })
    return orders
}

const getOrdersByUserIdAndStatus = async (userId, status) => {
    const orders = await Order.find({ userId, status })
    return orders
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getOrdersByUserId,
    getOrdersByStatus,
    getOrdersByRestaurantId,
    getOrdersByRestaurantIdAndStatus,
    getOrdersByUserIdAndStatus
}