const orderService = require("../services/order.service")
const catchAsync = require("../utils/catchAsync")


const createOrder = catchAsync(async (req, res, next) => {
    const order = await orderService.createOrder(req.body)
    res.send({ order })
})

const getOrderById = catchAsync(async (req, res, next) => {
    const order = await orderService.getOrderById(req.params.id)
    res.send({ order })
})

const updateOrderStatus = catchAsync(async (req, res, next) => {
    const order = await orderService.updateOrderStatus(req.params.id, req.body)
    res.send({ order })
})

const deleteOrder = catchAsync(async (req, res, next) => {
    await orderService.deleteOrder(req.params.id)
    res.send({ message: "order deleted" })
})

const getOrdersByUserId = catchAsync(async (req, res, next) => {
    const orders = await orderService.getOrdersByUserId(req.params.userId)
    res.send({ orders })
})

const getOrdersByStatus = catchAsync(async (req, res, next) => {
    const orders = await orderService.getOrdersByStatus(req.params.status)
    res.send({ orders })
})

const getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await orderService.getAllOrders()
    res.send({ orders })
})

module.exports = {
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getOrdersByUserId,
    getOrdersByStatus,
    getAllOrders
}