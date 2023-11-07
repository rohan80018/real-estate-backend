const mongoose = require("mongoose");

const BuySell = new mongoose.Schema({
    property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
    },
    requestFor: {
        type: String,
        enum: ["aconomy", "marketplace"],
    },
    status: {
        type: String,
        enum: ["none", "accepted", "withdrawn"],
        default: "none",
    },
    tokenPrice: {
        type: Number,
    },
    tokenValue: {
        type: Number,
    },
})