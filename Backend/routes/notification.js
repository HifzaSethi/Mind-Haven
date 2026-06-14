import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/save-token", async (req, res) => {
  const { token, userId } = req.body;

  await User.findByIdAndUpdate(userId, {
    fcmToken: token,
  });

  res.json({ success: true });
});

export default router;
