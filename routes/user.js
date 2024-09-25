import express from "express";

import { verifyToken } from "../controllers/authController.js";
import { deleteUserData, getUserData } from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getUserData);

router.post("/:positionId", deleteUserData);

export default router;
