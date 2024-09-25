import createError from "http-errors";

import admin from "../firebaseAdmin.js";

import Users from "../models/Users.js";

const login = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const existingUser = await Users.findOne({ userId: uid });

    const user =
      existingUser ||
      (await new Users({ userId: uid, email, positions: [] }).save());

    res.status(200).json({ user });
  } catch (error) {
    next(createError(401, "로그인에 실패하였습니다."));
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "로그아웃 성공" });
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(createError(403, "인증에 실패하였습니다."));
  }
};

export { login, logout, verifyToken };
