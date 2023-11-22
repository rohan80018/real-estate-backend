const mongoose = require("mongoose");

const BuySellSchema = new mongoose.Schema(
    {
    property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
        required: true,
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    requestFor: {
        type: String,
        enum: ["aconomy", "marketplace"],
        required: true,
    },
    status: {
        type: String,
        enum: ["none", "accepted", "cancel"],
        default: "none",
    },
    tokenPrice: {
        type: Number,
        required: true,
    },
    tokenValue: {
        type: Number,
        required: true,
    },
    _saleId: {
        type: Number,
        required: true,
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BuySell", BuySellSchema);