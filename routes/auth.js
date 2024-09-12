import express from "express";

const router = express.Router();

router.get("/google", (req, res) => {
  res.json({ title: "Google Login" });
});

export default router;
