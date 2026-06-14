import dotenv from "dotenv";
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
import express from "express";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import cors from "cors";
import weeklyAnalyticsRoutes from "./routes/weeklyAnalyticsRoutes.js";
import connectDB from "./config/db.js";
import { generateWeeklyReports } from "./services/weeklyReportService.js";
import authRoutes from "./routes/authRoutes.js";
import predictRoutes from "./routes/analysis.route.js";
import notificationRoutes from "./routes/notificationroute.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.get("/test-weekly-report", async (req, res) => {
  try {
    const reports = await generateWeeklyReports();

    res.json({
      success: true,
      reportsGenerated: reports.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notification", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/full-analysis", predictRoutes);
app.use("/api/weekly-analytics", weeklyAnalyticsRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

// ✅ START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB(); // wait for MongoDB

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // ✅ LOAD CRON ONLY AFTER DB IS READY
    import("./cron/reminderCron.js");
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
