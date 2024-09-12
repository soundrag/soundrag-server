import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.json({ title: "Express" });
});

export default router;
