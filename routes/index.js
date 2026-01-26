const express = require("express");
const Router = express.Router();
const userRoute = require("./user.route");

Router.use("/users", userRoute)

module.exports = Router