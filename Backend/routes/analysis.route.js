import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import User from "../models/User.js";
import Report from "../models/Report.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const user = req.user; // from auth middleware

    // =========================
    // PREPARE DATA FOR FLASK
    // =========================
    console.log("REQ BODY:", req.body);
    const formData = new FormData();

    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];

      if (Array.isArray(value)) {
        formData.append(key, value[0]); // ✅ FIX HERE
      } else {
        formData.append(key, value);
      }
    });

    if (req.file) {
      formData.append("image", fs.createReadStream(req.file.path));
    }

    // =========================
    // CALL FLASK
    // =========================
    const flaskRes = await axios.post(
      "http://127.0.0.1:5000/api/full-analysis",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    const result = flaskRes.data;

    // =========================
    // SAVE TO DB
    // =========================

    const report = await Report.create({
      userId: user._id,
      userName: user.name,
      guardianEmail: user.trustedEmail,

      final_score: result.final_score,
      risk_level: result.risk_level,
      emotion: result.emotion_detected,
      message: result.message,

      main_causes: Array.isArray(result.main_causes) ? result.main_causes : [],

      positive_signs: Array.isArray(result.positive_signs)
        ? result.positive_signs
        : [],

      primary_cause: result.primary_cause || "No major cause detected",

      date: new Date(),
    });
    await User.findByIdAndUpdate(user._id, {
      lastAssessmentDate: new Date(),
      lastReminderSent: null,
    });
    // const report = await Report.create({
    //   userId: user._id,
    //   userName: user.name,
    //   guardianEmail: user.trustedEmail,
    //   final_score: result.final_score,
    //   risk_level: result.risk_level,
    //   emotion: result.emotion_detected,
    //   message: result.message,

    //   // 🔥 FORCE SAFE ARRAY
    //   main_causes: Array.isArray(result.main_causes) ? result.main_causes : [],

    //   positive_signs: Array.isArray(result.positive_signs)
    //     ? result.positive_signs
    //     : [],

    //   date: new Date(),
    // });

    // =========================
    // CLEAN FILE
    // =========================
    if (req.file) fs.unlinkSync(req.file.path);

    // =========================
    // RESPONSE TO FRONTEND
    // =========================
    res.json({
      ...result,
      reportId: report._id,
    });
  } catch (err) {
    console.error("FULL ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

export default router;
