import Warehouse from "../../models/warehouse.js";
import User from "../../models/user.js";

export const createWarehouse = async (req, res) => {
  try {
    // check if req.user.role is admin
    // console.log(req.user);
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, location, managerEmail } = req.body;
    const manager = await User.findOne({ email: managerEmail });
    const newWarehouse = new Warehouse({
      name,
      location,
      manager,
    });
    await newWarehouse.save();

    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
