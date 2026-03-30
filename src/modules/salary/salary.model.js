const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
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
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  baseSalary: {
    type: Number,
    required: true
  },
  bonuses: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  },
  netSalary: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Processing"],
    default: "Pending"
  },
  paymentDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Salary", salarySchema);
