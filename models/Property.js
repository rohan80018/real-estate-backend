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
    required: true,
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
  TotalPrice: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    required: true,
  },
  rentPerToken: {
    type: Number,
    required: true,
  },
  rentStartDate: {
    type: Date,
    required: true,
  },
  rentSubsidy: {
    type: Number,
    required: true,
  },
  expectedIncome: {
    type: Number,
    required: true,
  },
  rentalType: {
    type: String,
    required: true,
  },
  rentpayingDuration: {
    type: Number,
    required: true,
  },
  propertyContractAddress: {
    type: { type: String, unique: true },
  },
  grossRent: {
    type: Number,
    required: true,
  },
  rentReceived: {
    type: Number,
    required: true,
  },
  totalRentPaid: {
    type: Number,
    required: true,
  },
  rentInstallment: {
    type: Number,
    required: true,
  },
  rentHistory: [rentHistorySchema],
  withdrawHistory : [withdrawEarningSchema],

});

module.exports = mongoose.model("Property", PropertySchema);
