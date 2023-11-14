const mongoose = require("mongoose");

const BuySellSchema = new mongoose.Schema(
    {
    property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    requestFor: {
        type: String,
        enum: ["none","aconomy", "marketplace"],
        default: "none",
    },
    status: {
        type: String,
        enum: ["none", "accepted", "cancel"],
        default: "none",
    },
    tokenPrice: {
        type: Number,
    },
    tokenValue: {
        type: Number,
    },
    _saleId: {
        type: Number,
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BuySell", BuySellSchema);