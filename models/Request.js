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
        amount: {
            type: Number,
        },
        token: {
            type: Number,
        },
        withdrawnAmount: {
            type: Number,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Request", RequestSchema);