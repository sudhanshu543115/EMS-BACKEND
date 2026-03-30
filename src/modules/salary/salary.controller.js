const Salary = require("./salary.model");

exports.generateSalary = async (req, res) => {
  try {
    const { employeeId, companyId, month, year, baseSalary, bonuses, deductions } = req.body;
    
    const netSalary = (baseSalary + (bonuses || 0)) - (deductions || 0);

    const salary = await Salary.create({
      employeeId,
      companyId,
      month,
      year,
      baseSalary,
      bonuses,
      deductions,
      netSalary,
      paymentStatus: "Pending"
    });

    res.status(201).json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate salary", error: error.message });
  }
};

exports.getSalaryHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const history = await Salary.find({ employeeId }).sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { salaryId, status } = req.body;
    const salary = await Salary.findByIdAndUpdate(
      salaryId,
      { paymentStatus: status, paymentDate: status === "Paid" ? new Date() : null },
      { new: true }
    );
    res.status(200).json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};
