const express = require("express")
const Router = express.Router()
const restaurantController = require("../controller/restaurant.controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

Router.post("/", auth, authorize(["createRestaurant"]), restaurantController.createRestaurant)
Router.get("/", auth, authorize(["queryRestaurants"]), restaurantController.queryRestaurants)
Router.get("/:id", auth, authorize(["getRestaurantById"]), restaurantController.getRestaurantById)
Router.put("/:id", auth, authorize(["updateRestaurant"]), restaurantController.updateRestaurant)
Router.delete("/:id", auth, authorize(["deleteRestaurant"]), restaurantController.deleteRestaurant)

module.exports = Router