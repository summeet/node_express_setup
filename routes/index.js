const express = require("express");
const Router = express.Router();
const userRoute = require("./user.route");

const routes = [
    {
        path: "/users",
        route: userRoute
    }
]

routes.forEach((route) => {
    Router.use(route.path, route.route)
})

module.exports = Router