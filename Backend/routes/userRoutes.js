import express from "express";
import User from "../models/User.js";
import admin from "../Utils/firebaseAdmin.js";
const router = express.Router();
router.post("/send-test-notification", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    const response = await admin.messaging().send({
      token,

      notification: {
        title: "Mental Health Reminder",
        body: "Your notification system is working 🎉",
      },

      webpush: {
        notification: {
          title: "Mental Health Reminder",
          body: "Your notification system is working 🎉",
        },
      },
    });

    console.log("Firebase response:", response);

    res.json({
      success: true,
      message: "Notification sent",
    });
  } catch (error) {
    console.log("FIREBASE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/save-token", async (req, res) => {
  try {
    const { userId, token } = req.body;

    await User.findByIdAndUpdate(userId, {
      fcmToken: token,
    });

    res.json({
      success: true,
      message: "FCM token saved",
    });
  } catch (error) {
    console.log("🔥 FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
