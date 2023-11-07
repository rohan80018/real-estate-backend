const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      unique: true,
    },
    name: String,
    username: { type: String, unique: true },
    email: {
      type: { type: String, unique: true },
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
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
