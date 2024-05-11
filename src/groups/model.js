const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  uuid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  members: [
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
        default: 0,
      },
    },
  ],
  expenses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expenses",
    }
  ],
  creator: {
    _id: false,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Assuming you have a User model
      required: true,
    },
    name: {
      type: String,
    },
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
