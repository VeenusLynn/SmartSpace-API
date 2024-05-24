import User from "../../models/user.js";
import errorHandler from "../../utils/errorHandler.js";
import validator from "validator";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Password is not strong enough! It must be at least 8 characters long and should contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character"
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    if (role) {
      newUser.role = role;
    }

    const user = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};
