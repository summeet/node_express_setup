const Router = require("express").Router()
const addressController = require("../controller/address.controller")
const authorize = require("../middleware/authorize")
const auth = require("../middleware/auth")

Router.post("/", auth, authorize(["user"]), addressController.createAddress)  
Router.put("/:id", auth, authorize(["user"]), addressController.updateAddress)
Router.delete("/:id", auth, authorize(["user"]), addressController.deleteAddress)
Router.get("/:id", auth, authorize(["user"]), addressController.getAddressById)

module.exports = Router