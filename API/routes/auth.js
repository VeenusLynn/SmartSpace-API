import express from "express";
import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import { verifyToken } from "../../utils/verifyToken.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
