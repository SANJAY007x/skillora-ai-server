const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Dashboard stats
  streak: {
  type: Number,
  default: 0,
},

lastActiveDate: {
  type: String,
  default: null,
},

    courses: {
      type: Number,
      default: 0,
    },

    learningTime: {
      type: Number,
      default: 0,
    },

    overallProgress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);