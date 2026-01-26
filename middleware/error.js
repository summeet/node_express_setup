const config = require("../config/config")
const ApiError = require("../utils/ApiError")
const mongoose = require("mongoose");
const httpStatus = require("../constant/httpStatus")

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        const isOperational = error instanceof mongoose.Error || statusCode !== httpStatus.INTERNAL_SERVER_ERROR;
        error = new ApiError(statusCode, message, isOperational, err.stack)
        error.name = err.name  // Preserve original error name (e.g. ValidationError)
        // Preserve Mongoose validation errors
        if (err.errors) {
            error.errors = err.errors;
        }
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (config.NODE_ENV === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[statusCode]
    }

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        ...(config.NODE_ENV === 'development' && { stack: err.stack }),
        name: err.name
    }

    if (err.name === 'ValidationError' && err.errors) {
        const errors = {};

        Object.keys(err.errors).forEach(key => {
            errors[key] = err.errors[key].message;
        });

        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Validation failed",
            errors
        });
    }

    res.status(statusCode).send(response)
}

module.exports = {
    errorHandler,
    errorConverter
}