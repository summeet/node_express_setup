
const code = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

const status = Object.fromEntries(
    Object.entries(code).map(([key, value]) => [value, key])
)

module.exports = {
    ...code,
    ...status
}