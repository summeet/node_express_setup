const express = require("express")
const Router = express.Router()
const categoryController = require("../controller/category.controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

Router.post("/", auth, authorize(["createCategory"]), categoryController.createCategory)
Router.get("/", categoryController.queryCategories)
Router.get("/:id", auth, authorize(["getCategoryById"]), categoryController.getCategoryById)
Router.get("/name/:name", categoryController.getCategoryByName)
Router.put("/:id", auth, authorize(["updateCategory"]), categoryController.updateCategory)
Router.delete("/:id", auth, authorize(["deleteCategory"]), categoryController.deleteCategory)
Router.get("/restaurant/:restaurantId", auth, authorize(["getCategoryByRestaurantId"]), categoryController.getCategoryByRestaurantId)

module.exports = Router