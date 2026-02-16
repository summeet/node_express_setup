const swaggerAutogen = require("swagger-autogen")();
const fs = require("fs");
const injectSchemas = require("./swagger.inject");

const doc = {
    info: {
        title: "CraveDash API Documentation",
        description: "Official API documentation for the CraveDash Food Delivery Platform. Includes endpoints for Authentication, Restaurants, Products, Cart management, and Orders.",
        version: "1.0.0"
    },
    host: "localhost:3001",
    basePath: "",
    schemes: ["http"],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter your bearer token in the format: Bearer <token>"
        }
    },
    definitions: {
        User: {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            contact: 9876543210,
            role: "user"
        },
        LoginCredential: {
            email: "john@gmail.com",
            password: "john@123"
        },
        Restaurant: {
            name: "La Pizzeria",
            description: "Authentic Italian pizzas and pasta",
            address: "123 Pizza Street, Food City",
            contact: 1234567890,
            image: "https://example.com/pizzeria.jpg",
            rating: 4.5
        },
        Product: {
            name: "Margherita Pizza",
            description: "Classic pizza with tomato, mozzarella, and basil",
            price: 499,
            image: "https://example.com/margherita.jpg",
            category: "Pizza",
            restaurantId: "restaurant_id_here",
            foodType: "VEG"
        },
        Order: {
            userId: "user_id_here",
            items: [
                {
                    productId: "product_id_here",
                    quantity: 2
                }
            ],
            deliveryAddress: {
                name: "John Doe",
                phone: "9876543210",
                addressLine: "123 Food Lane",
                city: "Mumbai",
                state: "Maharashtra",
                pinCode: 400001
            },
            paymentMethod: "cod",
            pricing: {
                total: 1048
            }
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
