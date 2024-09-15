import createError from "http-errors";

import admin from "../firebaseAdmin.js";

import { verifyJWT, generateJWT } from "../utils/jwtUtils.js";

const login = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const jwtToken = generateJWT({ uid, email });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "로그인 성공" });
  } catch (error) {
    next(createError(401, "로그인에 실패하였습니다."));
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "로그아웃 성공" });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ message: "로그인이 필요합니다." });
  }

  try {
    const decoded = verifyJWT(token);

    req.user = decoded;

    return res.status(200).json({ user: decoded });
  } catch (error) {
    next(createError(403, "인증에 실패하였습니다."));
  }
};

export { login, logout, verifyToken };
