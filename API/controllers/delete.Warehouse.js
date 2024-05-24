import Warehouse from "../../models/warehouse.js";
import Shelf from "../../models/shelf.js";

export const DeleteWarehouse = async (req, res) => {
  try {
    // check if req.user.role is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    const warehouseId = req.params.id;
    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    // delete all the shelves in the warehouse
    const shelves = warehouse.shelves;
    shelves.forEach(async (shelf) => {
      await Shelf.deleteOne({ name: shelf });
    });

    await Warehouse.deleteOne({ _id: warehouseId });

    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
