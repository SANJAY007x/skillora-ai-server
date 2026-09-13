const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    completedLessons: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

courseProgressSchema.index(
  { userId: 1, courseName: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "CourseProgress",
  courseProgressSchema
);