const express = require("express");
const Router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const restaurantRoute = require("./restaurant.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const addressRoute = require("./address.route");
const orderRoute = require("./order.route");

Router.use("/users", userRoute)
Router.use("/auth", authRoute)
Router.use("/restaurants", restaurantRoute)
Router.use("/categories", categoryRoute)
Router.use("/products", productRoute)
Router.use("/addresses", addressRoute)
Router.use("/cart", cartRoute)
Router.use("/orders", orderRoute)

module.exports = Router