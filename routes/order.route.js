const Router = require("express").Router()
const { orderController } = require("../controller")  
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

Router.post("/", auth, authorize(["user"]), orderController.createOrder)
Router.get("/:id", auth, authorize(["user"]), orderController.getOrderById)
Router.put("/:id", auth, authorize(["user"]), orderController.updateOrderStatus)
Router.delete("/:id", auth, authorize(["user"]), orderController.deleteOrder)
Router.get("/user/:userId", auth, authorize(["user"]), orderController.getOrdersByUserId)
Router.get("/status/:status", auth, authorize(["user"]), orderController.getOrdersByStatus)

module.exports = Router