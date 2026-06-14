import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-digit APP PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendWeeklyEmail = async (email, report) => {
  try {
    await transporter.verify();
    console.log("SMTP Ready");

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Mental Haven Weekly Report - ${report.userName}`,
      html: `
<div style="font-family:Arial;padding:20px;background:#f4f7fb">

  <div style="
      max-width:700px;
      margin:auto;
      background:white;
      border-radius:15px;
      padding:30px;
  ">

    <h1 style="color:#4f46e5">
      Mental Haven Weekly Report
    </h1>

    <p>
      Weekly wellness summary for
      <strong>${report.userName}</strong>
    </p>

    <hr/>

    <h2>Overview</h2>

    <p><strong>Assessments Completed:</strong> ${report.assessmentsCompleted}</p>

    <p><strong>Average Score:</strong> ${report.averageScore}</p>

    <p><strong>Highest Risk:</strong> ${report.highestRisk}</p>

    <p><strong>Most Common Emotion:</strong> ${report.commonEmotion}</p>

    <p><strong>Main Cause:</strong> ${report.commonCause}</p>

    <p><strong>Positive Sign:</strong> ${report.commonPositiveSign}</p>

    <hr/>

    <h2>Missed Assessment Days</h2>

 ${
   report.missedDays?.length
     ? `
      <ul>
        ${report.missedDays.map((day) => `<li>${day}</li>`).join("")}
      </ul>
    `
     : "<p>No missed assessments 🎉</p>"
 }

    <hr/>

    <p>
      Continue completing assessments regularly
      to improve emotional tracking.
    </p>

  </div>
</div>
`,
    });
    console.log("Accepted:", result.accepted);
    console.log("Rejected:", result.rejected);

    if (!result.accepted || result.accepted.length === 0) {
      throw new Error("Email not actually delivered");
    }

    console.log("✅ REAL EMAIL DELIVERED");
  } catch (err) {
    console.error("Email error:", err.message);
  }
};
