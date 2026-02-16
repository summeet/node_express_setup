const Router = require("express").Router()
const { orderController } = require("../controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

Router.post("/", auth, authorize(["createOrder"]), orderController.createOrder)
Router.get("/:id", auth, authorize(["getOrderById"]), orderController.getOrderById)
Router.put("/:id", auth, authorize(["updateOrderStatus"]), orderController.updateOrderStatus)
Router.delete("/:id", auth, authorize(["deleteOrder"]), orderController.deleteOrder)
Router.get("/user/:userId", auth, authorize(["getOrdersByUserId"]), orderController.getOrdersByUserId)
Router.get("/status/:status", auth, authorize(["getOrdersByStatus"]), orderController.getOrdersByStatus)

module.exports = Router