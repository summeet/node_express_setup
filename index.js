const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const config = require("./config/config")
const routes = require("./routes")
const { errorHandler, errorConverter } = require("./middleware/error")
const ApiError = require("./utils/ApiError")
const connectDatabase = require("./config/db")
const httpStatus = require("./constant/httpStatus")

const app = express();
const cors = require("cors");
app.use(cors());

connectDatabase()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
})

app.use(errorConverter)

app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`)
})