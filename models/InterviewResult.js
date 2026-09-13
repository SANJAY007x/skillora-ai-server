const mongoose = require("mongoose");

const interviewResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    overall: {
      type: Number,
      required: true,
    },

    communication: {
      type: Number,
      required: true,
    },

    grammar: {
      type: Number,
      required: true,
    },

    vocabulary: {
      type: Number,
      required: true,
    },

    relevance: {
      type: Number,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    strengths: {
      type: [String],
      default: [],
    },

    mistakes: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    questionFeedback: {
      type: [
        {
          question: String,
          answer: String,
          score: Number,
          grammar: String,
          communication: String,
          betterAnswer: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewResult",
  interviewResultSchema
);