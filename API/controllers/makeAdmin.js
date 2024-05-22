import User from "../../models/user.js";

export const makeAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User is now an admin" });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
