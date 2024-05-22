import Report from "../../models/report.js";

export const getAllReports = async (req, res) => {
  try {
    // verify that req.user.role is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
