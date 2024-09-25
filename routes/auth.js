import express from "express";

import { login, logout, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/verify-token", verifyToken);

export default router;
