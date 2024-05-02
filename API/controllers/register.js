import User from "../../models/user.js";
import errorHandler from "../../utils/errorHandler.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    const newUser = new User({
      fullName,
      email,
      password,
      phoneNumber,
    });

    const user = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};
