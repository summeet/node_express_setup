require('dotenv').config()
const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
.keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001),
    MONGODB_URI: Joi.string().required().description("Mongo DB Url")
})
.unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    PORT: envVars.PORT,
    MONGODB_URI: envVars.MONGODB_URI,
    NODE_ENV: envVars.NODE_ENV
}

module.exports = config