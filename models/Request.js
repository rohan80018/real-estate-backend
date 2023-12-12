const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema (
    {
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        requestType: {
            type: String,
            enum: ["buy", "sell"],
        },
        status: {
            type: String,
            enum: ["none", "accepted", "rejected"],
            default: "none",
        },
        orderId: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        token: {
            type: Number,
        },
        walletAddress : String,
        propertyName : String,
        propertyImg : String,
        totalPrice : Number,
        tokenPrice : Number,
        rentPerToken : Number,
        expectedIncome : Number,
        rentStartDate : String,
        issuerProfilePic: String,
        issuerName: String,
        rentalType: String,
        rented: String,
        contract: String,
        requestedToken: Number,
        country: String,
        propertyContractAddress: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Request", RequestSchema);