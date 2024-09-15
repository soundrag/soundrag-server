import jwt from "jsonwebtoken";

const verifyJWT = (token) => {
  return jwt.verify(token, process.JWT_SECRET);
};

const generateJWT = (userData, expiresIn = "1h") => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn });
};

export { verifyJWT, generateJWT };
