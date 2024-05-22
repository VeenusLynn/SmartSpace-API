import User from "../../models/user.js";

export const logout = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    // const refreshToken = user.refreshToken;
    // if (!refreshToken)
    //   return res.status(401).json({ message: "Access denied" });

    user.refreshToken = "";
    await user.save();

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
