const User = require("../schemas/user.schema")
const httpStatus = require("../constant/httpStatus");
const ApiError = require("../utils/ApiError")
const jwt = require("jsonwebtoken")
const BlacklistedToken = require("../schemas/blacklistedToken.schema")

const register = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const user = await User.create(userBody);
  const token = generateAuthToken(user);
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token };
}

const login = async (loginBody) => {
  const { email, contact, password } = loginBody
  const user = await User.findOne({ $or: [{ email }, { contact }] })
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
  }
  const token = generateAuthToken(user)
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token }
}

const generateAuthToken = (user) => {
  const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  })
  return token
}


const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  const decoded = jwt.decode(token)
  if (!decoded || !decoded.exp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token: No expiration time")
  }

  const existingToken = await BlacklistedToken.findOne({ token })
  if (existingToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Token already blacklisted")
  }

  await BlacklistedToken.create({
    token,
    expiresAt: new Date(decoded.exp * 1000)
  });

  res.json({ message: "Logged out successfully" });
}

module.exports = {
  register,
  login,
  logout
}
