const Router = require("express").Router()
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const checkoutController = require("../controller/checkout.controller")

Router.post("/", auth, authorize(["createCheckout"]), checkoutController.createCheckout)
Router.get("/:id", auth, authorize(["getCheckoutById"]), checkoutController.getCheckoutById)
Router.put("/:id", auth, authorize(["updateCheckoutStatus"]), checkoutController.updateCheckoutStatus)
Router.delete("/:id", auth, authorize(["deleteCheckout"]), checkoutController.deleteCheckout)
Router.get("/user/:userId", auth, authorize(["getCheckoutByUserId"]), checkoutController.getCheckoutByUserId)

Router.get("/status/:status", auth, authorize(["getCheckoutByStatus"]), checkoutController.getCheckoutByStatus)

module.exports = Router
