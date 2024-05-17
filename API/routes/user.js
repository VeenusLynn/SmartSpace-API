import express from "express";
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route");
});
// full route : /user/getUser/:id
router.get("/getUser/:id", getUser);

export default router;
