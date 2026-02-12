const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services")
const httpStatus = require("../constant/httpStatus")

const register = catchAsync(async (req, res) => {
    const { user, token } = await authService.register(req.body);
    res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.login(req.body)
    res.send({ user, token })
})

const logout = catchAsync(async (req, res, next) => {
    await authService.logout(req, res)
    res.send({ message: "logout success" })
})

module.exports = {
    register,
    login,
    logout
}