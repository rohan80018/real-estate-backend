const mongoose = require("mongoose");

const BuySell = new mongoose.Schema({
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
        enum: ["aconomy", "marketplace"],
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
})