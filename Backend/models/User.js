import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trustedEmail: String,

  // ✅ ADD THESE INSIDE schema
  lastAssessmentDate: {
  type: Date,
  default: null,
},

fcmToken: {
  type: String,
  default: null,
},

lastReminderSent: {
  type: Date,
  default: null,
},
    
});

const User = mongoose.model("User", userSchema);

export default User;
