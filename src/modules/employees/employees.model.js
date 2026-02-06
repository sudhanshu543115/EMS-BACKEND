const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["super_admin", "admin", "hr", "tl", "employee"],
    default: "employee",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  position: {
  type: String,
  enum: ["HR Manager", "Project Manager", "Team Lead", "Employee"],
  default: "Employee"
},
teamMembers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Employee"
}],
  
  salary: Number,
  hireDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },                                   
}, { timestamps: true });


module.exports = mongoose.model("Employee", employeeSchema);
