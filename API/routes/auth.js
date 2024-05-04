import express from "express";
import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import { verifyToken } from "../../utils/verifyToken.js";
import { deleteUser } from "../controllers/deleteUser.js";
import { refresh } from "../controllers/refresh.js";
import { logout } from "../controllers/logout.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.post("/refresh", refresh);
router.delete("/delete/:userId", verifyToken, deleteUser);

router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
