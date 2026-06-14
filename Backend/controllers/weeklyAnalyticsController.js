import WeeklyAnalytics from "../models/WeeklyAnalytics.js";

export const getHistory = async (req, res) => {
  try {
    const history = await WeeklyAnalytics.find({
      userId: req.params.userId,
    }).sort({
      generatedAt: -1,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
