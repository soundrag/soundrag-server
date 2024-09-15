import createError from "http-errors";
import { verifyJWT } from "../utils/jwtUtils";

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createError(401, "로그인이 필요합니다."));
  }

  try {
    const decoded = verifyJWT(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(createError(401, "인증에 실패하였습니다."));
  }
};

export { authenticateUser };
