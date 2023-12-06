const mongoose = require("mongoose");

const withdrawEarningSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
  },
      amount: Number,
      withdrawnInstallment: Number,
  },
  { timestamps: true }

);

const UserSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      unique: true,
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
  },
    name: String,
    username: { type: String },
    email: {
      type: { type: String },
    },
    whitelisted: {
      type: Boolean,
      default: false,
    },
    bio: String,
    role: {
      type: String,
      default: "user",
    },
    signatureMessage: {
      type: String,
    },
    socialLinks: {
      website: String,
      twitter: String,
      discord: String,
      telegram: String,
      instagram: String,
      other: String,
    },
    termOfService: {
      type: Boolean,
      // default: false
    },
    profileImage: String,
    bannerImage: String,
    verification_url: String,
    kycEventType: String,
    reviewStatus: String,
    withdrawnHistory: [withdrawEarningSchema],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
