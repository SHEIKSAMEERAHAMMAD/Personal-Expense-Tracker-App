const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { otpController,otpGenerateController, otpVerifyController } = require("../controllers/otpController")


const otpRouter = express.Router()

otpRouter.get("/", authMiddleware, otpController)
otpRouter.post('/otp-generate', authMiddleware, otpGenerateController)
otpRouter.post('/otp-verify', authMiddleware, otpVerifyController)

module.exports = otpRouter