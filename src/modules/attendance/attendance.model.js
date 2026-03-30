const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  checkIn: {
    type: Date
  },
  checkOut: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Half-day"],
    default: "Present"
  },
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
