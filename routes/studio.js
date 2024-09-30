import express from "express";

import { verifyToken } from "../controllers/authController.js";
import {
  getUserData,
  saveUserData,
  deleteUserData,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getUserData);

router.post("/:userId", verifyToken, saveUserData);

router.delete("/:positionId", verifyToken, deleteUserData);

export default router;
