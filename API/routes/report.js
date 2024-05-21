import express from "express";
import { makeReport } from "../controllers/makeReport.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Report route");
});

router.post("/make-report", makeReport);

export default router;
