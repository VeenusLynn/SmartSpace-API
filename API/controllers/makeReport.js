import Report from "../../models/report.js";
import User from "../../models/user.js";

export const makeReport = async (req, res) => {
  const { title, content, userId } = req.body;

  const author = await User.findById(userId);

  try {
    const report = await Report.create({ title, content, author });
    res.status(201).json({ report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
