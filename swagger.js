const swaggerAutogen = require("swagger-autogen")();
const fs = require("fs");
const injectSchemas = require("./swagger.inject");

const doc = {
    info: {
        title: "My API",
        description: "Auto generated Swagger",
    },
    host: "localhost:3001",
    schemes: ["http"],
    definitions: {
        User: {
            $name: "John Doe",
            $email: "john@example.com",
            $password: "password123",
            $contact: 1234567890,
            role: "user"
        }
    }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {

    let swaggerFile = require(outputFile);

    swaggerFile = injectSchemas(swaggerFile);

    fs.writeFileSync(outputFile, JSON.stringify(swaggerFile, null, 2));

    console.log("Swagger generated with schema injections");
});
