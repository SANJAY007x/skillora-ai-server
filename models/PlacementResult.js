const mongoose = require("mongoose");

const placementResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    answers: {
      type: [
        {
          question: String,
          userAnswer: String,
          correctAnswer: String,
          isCorrect: Boolean,
          explanation: String,
        },
      ],
      default: [],
    },

    analysis: {
      overall: {
        type: String,
        default: "",
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      weakTopics: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },

      nextStep: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PlacementResult",
  placementResultSchema
);