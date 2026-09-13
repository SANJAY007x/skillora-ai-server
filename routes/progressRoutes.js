const express = require("express");
const jwt = require("jsonwebtoken");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");

const router = express.Router();

// Get course progress
router.get("/:courseName", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const progress = await CourseProgress.findOne({
      userId: decoded.id,
      courseName: req.params.courseName,
    });

    res.status(200).json({
      completedLessons: progress
        ? progress.completedLessons
        : [],
    });
  } catch (error) {
    console.error("Get progress error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});

// Save course progress

router.post("/:courseName", async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const {
      completedLessons,
      timeSpent = 0,
    } = req.body;

    // Find existing course progress
    const oldProgress =
      await CourseProgress.findOne({
        userId: decoded.id,
        courseName: req.params.courseName,
      });

    const oldCompletedLessons =
      oldProgress?.completedLessons || [];

    // Check whether this is a NEW lesson
    const newLessonCompleted =
      completedLessons.some(
        (lesson) =>
          !oldCompletedLessons.includes(lesson)
      );

    // Save course progress
    const progress =
      await CourseProgress.findOneAndUpdate(
        {
          userId: decoded.id,
          courseName: req.params.courseName,
        },
        {
          userId: decoded.id,
          courseName: req.params.courseName,
          completedLessons,
        },
        {
          new: true,
          upsert: true,
        }
      );

    // Update user statistics
    const user =
      await User.findById(decoded.id);

    if (user && newLessonCompleted) {

      // Add learning time
      user.learningTime += Math.max(
        0,
        Number(timeSpent) || 0
      );

      // -----------------------------
      // UPDATE STREAK
      // -----------------------------

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const lastActive =
        user.lastActiveDate;

      if (lastActive !== today) {

        if (lastActive) {

          const lastDate =
            new Date(lastActive);

          const todayDate =
            new Date(today);

          const difference =
            Math.floor(
              (todayDate - lastDate) /
                (1000 * 60 * 60 * 24)
            );

          if (difference === 1) {
            user.streak += 1;
          } else {
            user.streak = 1;
          }

        } else {

          user.streak = 1;

        }

        user.lastActiveDate =
          today;
      }

      await user.save();
    }

    res.status(200).json({
      message:
        "Progress saved successfully",

      completedLessons:
        progress.completedLessons,

      timeSpent,
    });

  } catch (error) {

    console.error(
      "Save progress error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to save progress",
    });
  }
});



module.exports = router;