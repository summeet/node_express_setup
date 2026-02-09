

const { restaurantService } = require("../services")
const catchAsync = require("../utils/catchAsync")
const httpStatus = require("../constant/httpStatus")

const createRestaurant = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.createRestaurant(req.body)
    res.status(httpStatus.CREATED).send({
        message: "Restaurant created successfully",
        data: restaurant
    })
})

const queryRestaurants = catchAsync(async (req, res) => {
    const restaurants = await restaurantService.queryRestaurants();
    res.status(httpStatus.SUCCESS).send({
        data: restaurants
    })
})

const getRestaurantById = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getRestaurantById(req.params.id)
    res.status(httpStatus.SUCCESS).send({
        data: restaurant
    })
})

const updateRestaurant = catchAsync(async (req, res) => {
    const { params, body } = req;
    const restaurant = await restaurantService.updateRestaurant(params.id, body)
    res.status(httpStatus.SUCCESS).send({
        message: "Restaurant updated successfully",
        data: restaurant
    })
})

const deleteRestaurant = catchAsync(async (req, res) => {
    await restaurantService.deleteRestaurant(req.params.id)
    res.status(httpStatus.NO_CONTENT).send({
        message: "Restaurant deleted successfully"
    })
})

module.exports = {
    createRestaurant,
    queryRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}