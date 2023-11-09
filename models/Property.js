const mongoose = require("mongoose");

const rentHistorySchema = new mongoose.Schema(
  {
    amount: Number,
  },
  { timestamps: true }
);

const withdrawEarningSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
        amount: Number,
    },
    { timestamps: true }

);

const PropertySchema = new mongoose.Schema({
  name: String,
  mediaLinks: [
    {
      mediaType: { type: String, enum: ["image", "video", "audio"] },
      mediaLink: String,
    },
  ],
  assetJurisdiction: {
    country: String,
    area: String,
  },
  ownerName: {
    type: String,
    required: true,
  },
  issuerName: {
    type: String,
    required: true,
  },
  validatorName: {
    type: String,
  },
  about: {
    type: String,
    required: true,
  },
  attributes: [
    {
      key: String,
      value: String,
    },
  ],
  totalTokens: {
    type: Number,
    required: true,
  },
  tokenPrice: {
    type: Number,
    required: true,
  },
  maxInvestment: {
    type: Number,
    required: true,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
  offeringPercent: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    required: true,
  },
  rentPerToken: {
    type: Number,
    // required: true,
  },
  rentStartDate: {
    type: Date,
  },
  rentSubsidy: {
    type: Number,
  },
  expectedIncome: {
    type: Number,
  },
  rentalType: {
    type: String,
  },
  rentpayingDuration: {
    type: Number,
  },
  propertyContractAddress: {
    type: { type: String, unique: true },
  },
  grossRent: {
    type: Number,
  },
  rentReceived: {
    type: Number,
  },
  totalRentPaid: {
    type: Number,
  },
  rentInstallment: {
    type: Number,
  },
  rentHistory: [rentHistorySchema],
  withdrawHistory : [withdrawEarningSchema],

});

module.exports = mongoose.model("Property", PropertySchema);
