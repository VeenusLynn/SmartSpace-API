import express from "express";
import { createWarehouse } from "../controllers/createWarehouse.js";
import { DeleteWarehouse } from "../controllers/delete.Warehouse.js";
import { getAllWarehouses } from "../controllers/getAllWarehouses.js";
import { createShelf } from "../controllers/createShelf.js";
import { createItem } from "../controllers/createItem.js";
import { Overview } from "../controllers/overview.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("WMS route");
});

router.post("/create-warehouse", verifyToken, createWarehouse);
router.delete("/delete-warehouse/:id", verifyToken, DeleteWarehouse);
router.post("/create-shelf", verifyToken, createShelf);
router.post("/create-item", verifyToken, createItem);

router.get("/get-all-warehouses", getAllWarehouses);
router.get("/overview", Overview);

export default router;
