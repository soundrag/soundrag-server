import express from "express";

import { verifyToken } from "../controllers/authController.js";
import { saveUserData } from "../controllers/userController.js";

const router = express.Router();

router.post("/:userId", verifyToken, saveUserData);

export default router;
