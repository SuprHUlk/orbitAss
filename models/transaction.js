const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["success", "pending", "failed"],
    required: true,
  },
  type: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
