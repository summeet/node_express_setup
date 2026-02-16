module.exports = function injectSchemas(swaggerFile) {

    // Helper to inject body parameters
    const injectBody = (path, method, schema) => {
        if (swaggerFile.paths[path]?.[method]) {
            swaggerFile.paths[path][method].parameters = (swaggerFile.paths[path][method].parameters || []).filter(p => p.in !== 'body');
            swaggerFile.paths[path][method].parameters.push({
                name: "body",
                in: "body",
                schema: { $ref: `#/definitions/${schema}` }
            });
        }
    };

    // Auth
    injectBody("/api/auth/register", "post", "User");
    injectBody("/api/auth/login", "post", "LoginCredential");

    // Restaurants
    injectBody("/api/restaurants", "post", "Restaurant");
    injectBody("/api/restaurants/{id}", "put", "Restaurant");

    // Products
    injectBody("/api/products", "post", "Product");
    injectBody("/api/products/{id}", "put", "Product");

    // Orders
    injectBody("/api/orders", "post", "Order");

    // User Management
    injectBody("/api/users/", "post", "User");
    injectBody("/api/users/{id}", "put", "User");

    return swaggerFile;
};
