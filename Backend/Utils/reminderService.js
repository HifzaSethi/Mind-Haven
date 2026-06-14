import User from "../models/User.js";
import { sendNotification } from "./sendNotification.js";

export const checkAssessmentReminders = async () => {
  try {
    const users = await User.find({
      fcmToken: { $ne: null },
    });

    const now = Date.now();
    const MAX_REMINDERS_PER_DAY = 3;

    for (const user of users) {
      const lastAssessment = user.lastAssessmentDate;
      const lastReminder = user.lastReminderSent;
      let reminderCount = user.reminderCount || 0;

      // ✅ RESET DAILY COUNT
      const today = new Date().toDateString();
      if (user.lastReminderReset !== today) {
        reminderCount = 0;
        user.lastReminderReset = today;
      }

      // ❌ STOP IF LIMIT REACHED
      if (reminderCount >= MAX_REMINDERS_PER_DAY) {
        continue;
      }

      // =========================
      // CASE 1: NEVER DID ASSESSMENT
      // =========================
      if (!lastAssessment) {
        let waitTime = 1; // 1 hour (testing: change later)

        if (reminderCount === 1) waitTime = 6;
        if (reminderCount >= 2) waitTime = 24;

        if (lastReminder) {
          const hoursSince =
            (now - new Date(lastReminder).getTime()) / (1000 * 60 * 60);

          if (hoursSince < waitTime) continue;
        }

        await sendNotification(
          user.fcmToken,
          "Complete Your Initial Assessment",
          "Your assessment helps us understand your mental well-being and provide personalized support.",
        );

        user.lastReminderSent = new Date();
        user.reminderCount = reminderCount + 1;

        await user.save();
        continue;
      }

      // =========================
      // CASE 2: HAS DONE ASSESSMENT
      // =========================
      const hoursSinceAssessment =
        (now - new Date(lastAssessment).getTime()) / (1000 * 60 * 60);

      if (hoursSinceAssessment < 24) continue;

      if (lastReminder) {
        const hoursSinceReminder =
          (now - new Date(lastReminder).getTime()) / (1000 * 60 * 60);

        if (hoursSinceReminder < 24) continue;
      }

      await sendNotification(
        user.fcmToken,
        "Daily Mental Health Check-In",
        "It’s time for your daily check-in. Take a moment to reflect on your well-being.",
      );

      user.lastReminderSent = new Date();
      user.reminderCount = reminderCount + 1;

      await user.save();
    }
  } catch (error) {
    console.log("Reminder Error:", error);
  }
};
