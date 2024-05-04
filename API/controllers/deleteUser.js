import User from "../../models/user.js";

// To test this one out on Postman/Insomnia, you need to have a token from the login route
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.role !== "admin" && req.user.email !== user.email) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
