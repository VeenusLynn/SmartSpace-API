import Warehouse from "../../models/warehouse.js";

export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
