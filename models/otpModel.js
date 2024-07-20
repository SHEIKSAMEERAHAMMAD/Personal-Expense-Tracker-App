const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    // expires: 300, // 5 minutes expiration
    default: Date.now,
  },
  expireAt: { 
    type: Date 
  },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);

module.exports = otpModel;
