const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

const router = express.Router();

router.get("/stats", async (req, res) => {
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

    // Get user
    const user = await User.findById(
      decoded.id
    ).select(
      "streak courses learningTime"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get all course progress
    const courseProgress =
      await CourseProgress.find({
        userId: decoded.id,
      });

    // Total lessons in all 4 courses
    const totalLessons = 40;

    // Count completed lessons
    const completedLessons =
      courseProgress.reduce(
        (total, course) =>
          total +
          (course.completedLessons?.length || 0),
        0
      );

    // Calculate overall progress
    const overallProgress =
      Math.min(
        100,
        Math.round(
          (completedLessons / totalLessons) *
            100
        )
      );

    // Courses started
    const coursesStarted =
      courseProgress.filter(
        (course) =>
          course.completedLessons &&
          course.completedLessons.length > 0
      ).length;

    res.status(200).json({
      streak: user.streak,
      courses: user.courses,
      learningTime: user.learningTime,

      // Real progress
      overallProgress,

      // Real courses started
      coursesStarted,

      // Real completed lessons
      completedLessons,
    });

  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error
    );

    res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
});
router.get("/activity", async (req, res) => {
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

    const progressList =
      await CourseProgress.find({
        userId: decoded.id,
      }).sort({
        updatedAt: -1,
      });

    const courseTitles = {
      "java-dsa": "Java & DSA",
      "mern-stack": "MERN Stack",
      "dbms-sql": "DBMS & SQL",
      "operating-systems": "Operating Systems",
    };

    const activities = [];

    progressList.forEach((course) => {
      course.completedLessons.forEach(
        (lessonIndex) => {
          activities.push({
            type: "lesson",
            title: `Completed Lesson ${
              lessonIndex + 1
            }`,
            course:
              courseTitles[
                course.courseName
              ] || course.courseName,
            date: course.updatedAt,
          });
        }
      );
    });

    activities.sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    res.status(200).json({
      activities: activities.slice(0, 5),
    });

  } catch (error) {
    console.error(
      "Activity error:",
      error
    );

    res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
});
router.get("/continue", async (req, res) => {
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

    const progressList =
      await CourseProgress.find({
        userId: decoded.id,
      }).sort({
        updatedAt: -1,
      });

    const courseTitles = {
      "java-dsa": "Java & DSA",
      "mern-stack": "MERN Stack",
      "dbms-sql": "DBMS & SQL",
      "operating-systems":
        "Operating Systems",
    };

    const course =
      progressList.find(
        (item) =>
          item.completedLessons &&
          item.completedLessons.length > 0 &&
          item.completedLessons.length < 10
      ) || progressList.find(
        (item) =>
          item.completedLessons &&
          item.completedLessons.length > 0
      );

    if (!course) {
      return res.status(200).json({
        course: null,
      });
    }

    const completed =
      course.completedLessons.length;

    const totalLessons = 10;

    const progress = Math.round(
      (completed / totalLessons) * 100
    );

    const nextLesson =
      completed < totalLessons
        ? completed
        : totalLessons - 1;

    res.status(200).json({
      course: {
        name:
          courseTitles[
            course.courseName
          ] || course.courseName,

        slug: course.courseName,

        completedLessons: completed,

        totalLessons,

        progress,

        nextLesson,
      },
    });

  } catch (error) {
    console.error(
      "Continue learning error:",
      error
    );

    res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
});

module.exports = router;