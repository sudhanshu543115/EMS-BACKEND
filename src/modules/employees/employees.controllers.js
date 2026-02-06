const Employee = require("./employees.model");

// exports.createEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.createEmployee = async (req,res)=>{
  try {
    const { name, email, password, role, companyId, position, salary, hireDate, isActive } = req.body;

    if(!name || !email || !password || !role || !companyId || !position || !salary || !hireDate){
      return res.status(400).json({
        success: false,
        required: true
      });
    }

    const employee = await Employee.create({
      name,
      email,
      password,
      role,
      companyId,
      position,
      salary,
      hireDate,
      isActive
    })

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
















