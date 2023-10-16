const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
