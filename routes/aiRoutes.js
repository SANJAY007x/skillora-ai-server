
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const {
      message,
      history = [],
      instruction = "",
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a question",
      });
    }

    const contents = [
      // =====================================================
      // AI TUTOR INSTRUCTION
      // =====================================================

      ...(instruction
        ? [
            {
              role: "user",
              parts: [
                {
                  text: instruction,
                },
              ],
            },
          ]
        : []),

      // =====================================================
      // CHAT HISTORY
      // =====================================================

      ...history.map((item) => ({
        role:
          item.role === "user"
            ? "user"
            : "model",

        parts: [
          {
            text: item.text,
          },
        ],
      })),

      // =====================================================
      // CURRENT USER MESSAGE
      // =====================================================

      {
        role: "user",
        parts: [
          {
            text: message.trim(),
          },
        ],
      },
    ];

    // =====================================================
    // GEMINI
    // =====================================================

    const response =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
      });

    res.status(200).json({
      reply: response.text,
    });
  } catch (error) {
    console.error(
      "Gemini AI error:",
      error
    );

    res.status(500).json({
      message:
        "AI service failed. Please try again.",
    });
  }
});

module.exports = router;

