import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
  dotenv.config();
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(403)
      .json({ message: "Token verification failed. Access denied !" });
  }
};
