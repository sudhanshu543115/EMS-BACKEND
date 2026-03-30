const Attendance = require("./attendance.model");

exports.checkIn = async (req, res) => {
  try {
    const { employeeId, companyId, remarks } = req.body;
    
    // Check if already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const existing = await Attendance.findOne({
      employeeId,
      date: { $gte: startOfDay }
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await Attendance.create({
      employeeId,
      companyId,
      checkIn: new Date(),
      remarks
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to check in", error: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { attendanceId } = req.body;
    
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { checkOut: new Date() },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to check out", error: error.message });
  }
};

exports.getAttendanceHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const history = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};
