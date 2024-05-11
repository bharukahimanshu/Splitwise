const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
    required: true,
  },
  payer: {
    _id: false,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Assuming you have a User model
      required: true,
    },
    name: {
      type: String,
    },
    amt: {
      type: Number,
    },
  },
  payment_type: {
    type: String,
    required: true,
  },
  participants: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
      },
      amt: {
        type: Number,
      },
    },
  ],
  description: {
    type: String,
  },
  expense_date: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const expense = mongoose.model("expense", expenseSchema);

module.exports = expense;
