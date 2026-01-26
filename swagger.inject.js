module.exports = function injectSchemas(swaggerFile) {

    // POST /api/users/
    if (swaggerFile.paths["/api/users/"]?.post) {
        swaggerFile.paths["/api/users/"].post.parameters = [
            {
                name: "body",
                in: "body",
                schema: {
                    $ref: "#/definitions/User"
                }
            }
        ];
    }

    // PUT /api/users/{id}
    if (swaggerFile.paths["/api/users/{id}"]?.put) {
        swaggerFile.paths["/api/users/{id}"].put.parameters = [
            {
                name: "id",
                in: "path",
                required: true,
                type: "string"
            },
            {
                name: "body",
                in: "body",
                schema: {
                    $ref: "#/definitions/User"
                }
            }
        ];
    }

    return swaggerFile;
};
