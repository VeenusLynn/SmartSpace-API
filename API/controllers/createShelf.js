import Shelf from "../../models/shelf.js";
import Warehouse from "../../models/warehouse.js";

export const createShelf = async (req, res) => {
  const { name, warehouseName, maxVolume } = req.body;
  try {
    const warehouse = await Warehouse.findOne({ name: warehouseName });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    const shelf = new Shelf({
      name,
      warehouse: warehouse,
      maxVolume,
      freeVolume: maxVolume,
    });
    await shelf.save();
    warehouse.shelves.push(shelf.name);

    warehouse.maxVolume += Number(maxVolume);
    warehouse.freeVolume += Number(maxVolume);

    await warehouse.save();
    res.status(201).json(shelf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
