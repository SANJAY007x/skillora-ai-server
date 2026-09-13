
const express = require("express");

const InterviewResult = require("../models/InterviewResult");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// SAVE INTERVIEW RESULT
// =====================================================

router.post(
  "/results",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        overall,
        communication,
        grammar,
        vocabulary,
        relevance,
        confidence,
        level,
        strengths,
        mistakes,
        improvements,
        questionFeedback,
      } = req.body;

      // -----------------------------------------------
      // VALIDATION
      // -----------------------------------------------

      if (
        overall === undefined ||
        communication === undefined ||
        grammar === undefined ||
        vocabulary === undefined ||
        relevance === undefined ||
        confidence === undefined ||
        !level
      ) {
        return res.status(400).json({
          message:
            "Incomplete interview result",
        });
      }

      // -----------------------------------------------
      // CREATE RESULT
      // -----------------------------------------------

      const result =
        await InterviewResult.create({
          userId: req.user.id,

          overall,
          communication,
          grammar,
          vocabulary,
          relevance,
          confidence,

          level,

          strengths:
            Array.isArray(strengths)
              ? strengths
              : [],

          mistakes:
            Array.isArray(mistakes)
              ? mistakes
              : [],

          improvements:
            Array.isArray(improvements)
              ? improvements
              : [],

          questionFeedback:
            Array.isArray(
              questionFeedback
            )
              ? questionFeedback
              : [],
        });

      res.status(201).json({
        message:
          "Interview result saved successfully",

        result,
      });
    } catch (error) {
      console.error(
        "Save interview result error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to save interview result",
      });
    }
  }
);

// =====================================================
// GET ALL INTERVIEW RESULTS
// =====================================================

router.get(
  "/results",
  authMiddleware,
  async (req, res) => {
    try {
      const results =
        await InterviewResult.find({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        results,
      });
    } catch (error) {
      console.error(
        "Get interview history error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to get interview history",
      });
    }
  }
);

// =====================================================
// GET LATEST INTERVIEW RESULT
// =====================================================

router.get(
  "/results/latest",
  authMiddleware,
  async (req, res) => {
    try {
      const result =
        await InterviewResult.findOne({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      if (!result) {
        return res.status(404).json({
          message:
            "No interview result found",
        });
      }

      res.status(200).json({
        result,
      });
    } catch (error) {
      console.error(
        "Get latest interview result error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to get latest interview result",
      });
    }
  }
);

// =====================================================
// GET BEST INTERVIEW RESULT
// =====================================================

router.get(
  "/results/best",
  authMiddleware,
  async (req, res) => {
    try {
      const result =
        await InterviewResult.findOne({
          userId: req.user.id,
        }).sort({
          overall: -1,
        });

      if (!result) {
        return res.status(404).json({
          message:
            "No interview result found",
        });
      }

      res.status(200).json({
        result,
      });
    } catch (error) {
      console.error(
        "Get best interview result error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to get best interview result",
      });
    }
  }
);

module.exports = router;
