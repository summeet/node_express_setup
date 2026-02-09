const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../schemas/blacklistedToken.schema")

module.exports = async function (req, res, next) {
    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return res.status(401).send({ message: "unauthorized" })
    }

    const token = authHeader.split(" ")[1]
    const blacklisted = await BlacklistedToken.findOne({ token })
    if (blacklisted) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).send({ message: "unauthorized" })
    }
}