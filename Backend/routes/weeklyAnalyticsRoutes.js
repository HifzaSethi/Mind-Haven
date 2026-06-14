import express from "express";
import { getHistory } from "../controllers/weeklyAnalyticsController.js";

const router = express.Router();

router.get("/:userId", getHistory);

export default router;
