const express = require("express");
const PlacementResult = require("../models/PlacementResult");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// SAVE PLACEMENT TEST RESULT
// =====================================================

router.post("/results", authMiddleware, async (req, res) => {
  try {
    const {
      role,
      topic,
      difficulty,
      totalQuestions,
      score,
      percentage,
      answers,
      analysis,
    } = req.body;

    if (
      !role ||
      !topic ||
      !difficulty ||
      totalQuestions === undefined ||
      score === undefined ||
      percentage === undefined
    ) {
      return res.status(400).json({
        message: "Missing placement test data",
      });
    }

    const result = await PlacementResult.create({
      userId: req.user.id,

      role,
      topic,
      difficulty,
      totalQuestions,
      score,
      percentage,

      answers: answers || [],

      analysis: analysis || {},
    });

    res.status(201).json({
      message: "Placement result saved successfully",
      result,
    });
  } catch (error) {
    console.error(
      "Save placement result error:",
      error
    );

    res.status(500).json({
      message: "Failed to save placement result",
    });
  }
});

// =====================================================
// GET ALL PLACEMENT RESULTS FOR CURRENT USER
// =====================================================

router.get(
  "/results",
  authMiddleware,
  async (req, res) => {
    try {
      const results =
        await PlacementResult.find({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        results,
      });
    } catch (error) {
      console.error(
        "Get placement results error:",
        error
      );

      res.status(500).json({
        message: "Failed to get placement results",
      });
    }
  }
);

// =====================================================
// GET LATEST PLACEMENT RESULT
// =====================================================

router.get(
  "/results/latest",
  authMiddleware,
  async (req, res) => {
    try {
      const result =
        await PlacementResult.findOne({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      if (!result) {
        return res.status(404).json({
          message: "No placement test found",
        });
      }

      res.status(200).json({
        result,
      });
    } catch (error) {
      console.error(
        "Get latest placement result error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to get latest placement result",
      });
    }
  }
);

// =====================================================
// GET PLACEMENT PROGRESS HISTORY
// =====================================================

router.get(
  "/results/progress",
  authMiddleware,
  async (req, res) => {
    try {
      const results =
        await PlacementResult.find({
          userId: req.user.id,
        })
          .select(
            "role topic difficulty totalQuestions score percentage analysis.weakTopics createdAt"
          )
          .sort({
            createdAt: 1,
          });

      const progress = results.map(
        (result, index) => ({
          attempt: index + 1,

          date: result.createdAt,

          role: result.role,

          topic: result.topic,

          difficulty: result.difficulty,

          totalQuestions:
            result.totalQuestions,

          score: result.score,

          percentage:
            result.percentage,

          weakTopics:
            result.analysis?.weakTopics || [],
        })
      );

      res.status(200).json({
        progress,
      });
    } catch (error) {
      console.error(
        "Get placement progress error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to get placement progress",
      });
    }
  }
);

module.exports = router;