const { userService } = require("../services")
const catchAsync = require("../utils/catchAsync")
const httpStatus = require("../constant/httpStatus")
const ApiError = require("../utils/ApiError")

const createUser = catchAsync(async (req, res) => {
    const user = await userService.create(req.body)
    res.status(httpStatus.CREATED).send({
        message: "User created successfully",
        data: user
    })
})

const queryUsers = catchAsync(async (req, res) => {
    const users = await userService.queryUsers();
    res.status(httpStatus.SUCCESS).send({
        data: users
    })
})

const getUserById = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    res.status(httpStatus.SUCCESS).send({
        data: user
    })
})

const updateUser = catchAsync(async (req, res) => {
    const { params, body } = req;
    const user = await userService.updateUser(params.id, body)
    res.status(httpStatus.SUCCESS).send({
        message: "User updated successfully",
        data: user
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const result = await userService.deleteUser(req.params.id)
    res.status(httpStatus.NO_CONTENT).send({
        message: "User deleted successfully"
    })
})

module.exports = {
    createUser,
    queryUsers,
    getUserById, 
    updateUser,
    deleteUser
}