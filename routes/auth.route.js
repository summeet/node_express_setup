const express = require("express")
const authController = require("../controller/auth.controller")

const Router = express.Router()

Router.post("/register", authController.register)
Router.post("/login", authController.login)
Router.post("/logout", authController.logout)

module.exports = Router