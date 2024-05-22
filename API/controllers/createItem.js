import Item from "../../models/item.js";
import Shelf from "../../models/shelf.js";
import Warehouse from "../../models/warehouse.js";

export const createItem = async (req, res) => {
  const { objectClass, shelfName, unitVolume } = req.body;
  try {
    const shelf = await Shelf.findOne({ name: shelfName });
    if (!shelf) {
      return res.status(404).json({ message: "Shelf not found" });
    }

    if (unitVolume == 0) {
      return res.status(409).json({ message: "Volume cannot be 0" });
    }

    if (shelf.freeVolume < unitVolume) {
      return res
        .status(409)
        .json({ message: "Not enough space for this item!" });
    }
    const item = new Item({
      objectClass,
      shelf: shelf,
      unitVolume,
    });
    await item.save();

    shelf.items.push(item._id);

    shelf.freeVolume -= Number(unitVolume);
    shelf.usedVolume += Number(unitVolume);

    const warehouse = await Warehouse.findById(shelf.warehouse);
    warehouse.freeVolume -= Number(unitVolume);
    warehouse.usedVolume += Number(unitVolume);

    await warehouse.save();
    await shelf.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
