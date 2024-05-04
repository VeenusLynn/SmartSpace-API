import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const login = async (req, res) => {
  try {
    dotenv.config();
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        expected: user.password,
        actual: password,
        isMatch: isMatch,
      });
    }

    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { email: user.email, role: user.role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful !",
      user: user,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
