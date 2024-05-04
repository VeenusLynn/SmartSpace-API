import User from "../../models/user.js";

export const logout = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken)
      return res.status(401).json({ message: "Access denied" });

    // Check if the refresh token is valid in the database
    const user = await User.findOne({ refreshToken });

    if (!user)
      return res
        .status(403)
        .json({ message: "Refresh token not found, user is not logged in" });

    user.refreshToken = "";
    await user.save();

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
