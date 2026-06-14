import cron from "node-cron";
import User from "../models/User.js";
import { checkAssessmentReminders } from "../Utils/reminderService.js";
import { generateWeeklyReports } from "../services/weeklyReportService.js";
import { sendWeeklyEmail } from "../services/emailService.js";

console.log("🟢 Cron file loaded successfully");

// Daily reminders
cron.schedule("0 9 * * *", async () => {
  try {
    console.log("⏰ Running reminder check...");
    await checkAssessmentReminders();
  } catch (error) {
    console.error("Reminder cron error:", error);
  }
});

// Weekly reports
cron.schedule(
  "0 9 * * SUN",
  async () => {
    try {
      console.log("📊 Generating weekly reports...");

      const results = await generateWeeklyReports();

      if (!results.length) {
        console.log("No reports generated this week");
        return;
      }

      for (const item of results) {
        const { user, analytics } = item;

        if (user?.trustedEmail) {
          console.log("📨 Sending email to:", user.trustedEmail);

          await sendWeeklyEmail(user.trustedEmail, analytics);

          console.log("✅ Email sent:", user.trustedEmail);
        }
      }

      console.log("🎉 Weekly emails completed");
    } catch (error) {
      console.error("Weekly cron error:", error);
    }
  },
  { timezone: "Asia/Karachi" },
);
