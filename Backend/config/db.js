import mongoose from "mongoose";
import { generateWeeklyReports } from "../services/weeklyReportService.js";
import Report from "../models/Report.js";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const allReports = await Report.find();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
