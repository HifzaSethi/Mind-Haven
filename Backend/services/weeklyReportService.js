import Report from "../models/Report.js";
import User from "../models/User.js";
import WeeklyAnalytics from "../models/WeeklyAnalytics.js";
import { getMostFrequent } from "./analyticsService.js";
import { sendWeeklyEmail } from "./emailService.js";

export const generateWeeklyReports = async () => {
  console.log("Analytics Started");

  const users = await User.find();
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const results = [];

  for (const user of users) {
    const reports = await Report.find({
      userId: user._id,
      date: { $gte: startOfWeek },
    });
    const last7Days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);

      last7Days.push(day.toDateString());
    }

    const completedDays = reports.map((r) => new Date(r.date).toDateString());

    const missedDays = last7Days.filter((day) => !completedDays.includes(day));

    if (!reports.length) continue;

    const averageScore =
      reports.reduce((sum, r) => sum + r.final_score, 0) / reports.length;

    const emotions = reports.map((r) => r.emotion);
    const causes = reports.flatMap((r) => r.main_causes || []);
    const positives = reports.flatMap((r) => r.positive_signs || []);

    const riskPriority = { Low: 1, Moderate: 2, High: 3 };

    const highestRisk = reports.reduce((max, current) =>
      riskPriority[current.risk_level] > riskPriority[max.risk_level]
        ? current
        : max,
    ).risk_level;

    const analytics = {
      userId: user._id,
      userName: user.name,
      assessmentsCompleted: reports.length,
      averageScore: averageScore.toFixed(2),
      highestRisk,
      commonEmotion: getMostFrequent(emotions),
      commonCause: getMostFrequent(causes),
      commonPositiveSign: getMostFrequent(positives),
      generatedAt: new Date(),
      missedDays,
    };

    const saved = await WeeklyAnalytics.create(analytics);
    console.log("Weekly Analytics Saved:", saved._id);
    results.push({
      user,
      analytics,
      savedReport: saved,
    });
  }

  return results;
};
