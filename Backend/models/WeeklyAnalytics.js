// import mongoose from "mongoose";

// const weeklyAnalyticsSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

//   userName: String,

//   assessmentsCompleted: Number,

//   averageScore: Number,

//   highestRisk: String,

//   commonEmotion: String,

//   commonCause: String,

//   commonPositiveSign: String,

//   generatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("WeeklyAnalytics", weeklyAnalyticsSchema);
import mongoose from "mongoose";

const weeklyAnalyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userName: String,

  assessmentsCompleted: Number,

  averageScore: Number,

  highestRisk: String,

  commonEmotion: String,

  commonCause: String,

  commonPositiveSign: String,

  missedDays: {
    type: [String],
    default: [],
  },

  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("WeeklyAnalytics", weeklyAnalyticsSchema);
