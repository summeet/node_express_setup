const mongoose = require("mongoose")
const config = require("./config")

const connectDatabase = async () => {
   try {
    await mongoose.connect(config.MONGODB_URI)
    console.log(`MongoDB connected successfully`)
   } catch (error) {
    console.log(`MongoDB connection failure`)
   }
}

module.exports = connectDatabase