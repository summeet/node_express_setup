const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services")

const login = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.login(req.body)
    res.send({ user, token })
})

const logout = catchAsync(async (req, res, next) => {
    await authService.logout(req, res)
    res.send({ message: "logout success" })
})

module.exports = {
    login,
    logout
}