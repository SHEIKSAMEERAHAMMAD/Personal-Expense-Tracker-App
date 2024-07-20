const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()


// Define the transporter for sending emails
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.Mail_Username,
        pass: process.env.Mail_Password
    }
})
module.exports = transporter
