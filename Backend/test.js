import dotenv from "dotenv";
dotenv.config();

import { sendWeeklyEmail } from "./services/emailService.js";

sendWeeklyEmail("your_email@gmail.com", {
  test: "Hello from MentalHaven 🚀",
});
