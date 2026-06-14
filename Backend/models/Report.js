import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    userName: String,
    guardianEmail: String,

    final_score: Number,
    risk_level: String,
    emotion: String,
    message: String,

    main_causes: {
      type: [String],
      default: [],
    },

    positive_signs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Report", reportSchema);
