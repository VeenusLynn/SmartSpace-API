import express from "express";
import { createWarehouse } from "../controllers/createWarehouse.js";
import { createShelf } from "../controllers/createShelf.js";
import { createItem } from "../controllers/createItem.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("WMS route");
});

router.post("/create-warehouse", verifyToken, createWarehouse);
router.post("/create-shelf", verifyToken, createShelf);
router.post("/create-item", verifyToken, createItem);

export default router;
