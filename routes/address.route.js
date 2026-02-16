const Router = require("express").Router()
const addressController = require("../controller/address.controller")
const authorize = require("../middleware/authorize")
const auth = require("../middleware/auth")

Router.post("/", auth, authorize(["createAddress"]), addressController.createAddress)
Router.put("/:id", auth, authorize(["updateAddress"]), addressController.updateAddress)
Router.delete("/:id", auth, authorize(["deleteAddress"]), addressController.deleteAddress)
Router.get("/:id", auth, authorize(["getAddressById"]), addressController.getAddressById)
Router.get("/user/:userId", auth, authorize(["getAddressesByUserId"]), addressController.getAddressesByUserId)
Router.patch("/default", auth, authorize(["updateDefaultAddress"]), addressController.updateDefaultAddress)
Router.get("/default/:userId", auth, authorize(["getDefaultAddress"]), addressController.getDefaultAddress)

module.exports = Router