import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./service-account-key.json"),
});

export default admin;
