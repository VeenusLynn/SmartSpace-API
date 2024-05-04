import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken)
      return res.status(401).json({ message: "Access denied" });

    // Check if the refresh token is valid in the database
    const user = await User.findOne({ refreshToken });

    if (!user)
      return res.status(403).json({ message: "Refresh token not found" });

    // generate new access token and refresh token
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const newRefreshToken = jwt.sign(
      { email: user.email, role: user.role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: "tokens refreshed successfully",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
