require('dotenv').config()

const config = {
    PORT: process.env.PORT ?? 3001,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV ?? 'development'
}

module.exports = config