import express from "express";
import { getUser } from "../controllers/getUser.js";
import { makeAdmin } from "../controllers/makeAdmin.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route");
});
// full route : /user/getUser/:id
router.get("/getUser/:id", getUser);
router.post("/make-admin", verifyToken, makeAdmin);

export default router;
