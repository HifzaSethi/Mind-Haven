import mongoose from "mongoose";
import Report from "./models/Report.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Report.updateMany({}, [
  {
    $set: {
      main_causes: { $ifNull: ["$main_causes", "$causes"] },
    },
  },
]);

await Report.updateMany(
  {},
  {
    $unset: { causes: "" },
  },
);

console.log("Migration completed");
process.exit();
