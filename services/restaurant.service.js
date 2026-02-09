const Restaurant = require("../schemas/restaurant.schema")
const httpStatus = require("../constant/httpStatus")
const ApiError = require("../utils/ApiError")

const createRestaurant = async (restaurantData) => {
    const restaurant = await Restaurant.create(restaurantData)
    return restaurant
}

const queryRestaurants = async () => {
    const restaurants = await Restaurant.find()
    return restaurants
}

const getRestaurantById = async (id) => {
    const restaurant = await Restaurant.findById(id)
    if(!restaurant){
        throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found")
    }
    return restaurant
}

const updateRestaurant = async (id, restaurantData) => {
    const restaurant = await Restaurant.findByIdAndUpdate(id, restaurantData, { new: true, runValidators: true })
    if(!restaurant){
        throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found")
    }
    return restaurant
}

const deleteRestaurant = async (id) => {
    const restaurant = await Restaurant.findByIdAndDelete(id)
    if(!restaurant){
        throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found")
    }
}

module.exports = {
    createRestaurant,
    queryRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}
