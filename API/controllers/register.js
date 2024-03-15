import User from "../../models/user.js";
import errorHandler from "../../utils/errorHandler.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};
