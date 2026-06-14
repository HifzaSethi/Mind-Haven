import express from "express";
import User from "../models/User.js";

const router = express.Router();

// SAVE TOKEN
router.post("/save-token", async (req, res) => {
  try {
    const { userId, token } = req.body;

    await User.findByIdAndUpdate(userId, {
      fcmToken: token,
    });

    res.json({ message: "Token saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;