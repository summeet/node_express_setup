const Router = require("express").Router()
const cartController = require("../controller/cart.controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

Router.post("/add", auth, authorize(["createCart"]), cartController.addCart)
Router.get("/:userId", auth, authorize(["getCart"]), cartController.getCart)
Router.put("/update", auth, authorize(["updateCart"]), cartController.updateCart)
Router.delete("/delete", auth, authorize(["deleteCart"]), cartController.deleteCart)
Router.delete("/clear/:userId", auth, authorize(["clearCart"]), cartController.clearCart)

module.exports = Router

