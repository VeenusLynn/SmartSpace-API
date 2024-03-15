import express from "express";
import { landing } from "../controllers/landing.js";

const router = express.Router();

router.get("/", landing);

export default router;
