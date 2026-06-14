import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("../mental-health-system.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
