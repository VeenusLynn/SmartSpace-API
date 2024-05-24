import Warehouse from "../../models/warehouse.js";

export const Overview = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    // calculate total number of warehouses, all maxVolume, all freeVolume, all usedVolume
    let totalWarehouses = 0;
    let totalMaxVolume = 0;
    let totalFreeVolume = 0;
    let totalUsedVolume = 0;
    warehouses.forEach((warehouse) => {
      totalWarehouses++;
      totalMaxVolume += warehouse.maxVolume;
      totalFreeVolume += warehouse.freeVolume;
      totalUsedVolume += warehouse.usedVolume;
    });

    // calculate the percentage of free and used volume
    let totalFreeVolumePer = Math.round(
      (totalFreeVolume / totalMaxVolume) * 100
    );
    let totalUsedVolumePer = Math.round(
      (totalUsedVolume / totalMaxVolume) * 100
    );

    res.status(200).json({
      totalWarehouses,
      totalMaxVolume,
      totalFreeVolume,
      totalUsedVolume,
      totalFreeVolumePer,
      totalUsedVolumePer,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
