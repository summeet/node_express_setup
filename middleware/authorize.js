const { roleRights } = require("../config/roles")
const httpStatus = require("../constant/httpStatus")

module.exports = function (requiredRights) {
    return (req, res, next) => {
        const userRole = req.user.role
        const permissions = roleRights.get(userRole)
        console.log('permissions', permissions)
        if (!requiredRights.every(right => permissions.includes(right))) {
            return res.status(httpStatus.FORBIDDEN).send({ message: "forbidden" })
        }
        next()
    }
}
