import admin from "./firebaseAdmin.js";

export const sendNotification = async (token, title, body) => {
  try {
    await admin.messaging().send({
      token,

      notification: {
        title,
        body,
      },

      webpush: {
        notification: {
          title,
          body,
        },
      },
    });

    console.log("Notification sent successfully");
  } catch (err) {
    console.log("Notification error:", err.message);
  }
};
