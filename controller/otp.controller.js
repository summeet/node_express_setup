const catchAsync = require("../utils/catchAsync")
const { createHash } = require("../utils/customCrypt")
const { generateOtp } = require("../utils/generateOtp")

const sendOtp = catchAsync(async (req, res) => {
    const { identifier, purpose } = req.body
    const otp = generateOtp()
    const otpHash = await createHash(otp, 10)


})

module.exports = {
    sendOtp
}