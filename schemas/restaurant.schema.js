const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    rating: {
        type: Number,
        required: true
    },
    address: String,
    restaurantType: {
        type: String,
        enum: {
            values: ["VEG", "NON_VEG", "BOTH"],
            message: '{VALUE} is not supported'
        },
        required: [true, "Restaurant type is required"],
        uppercase: true,
        trim: true
    }
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)
