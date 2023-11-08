const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema (
    {
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
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
        withdrawnInstallment: {
            type: Number,
        },
        withdrawnTimestamp: {
            type: Date,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Request", RequestSchema);