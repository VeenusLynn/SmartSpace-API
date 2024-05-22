import express from "express";
import { makeReport } from "../controllers/makeReport.js";
import { getAllReports } from "../controllers/getAllReports.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.post("/make-report", makeReport);
router.get("/get-all-reports", verifyToken, getAllReports);

export default router;
