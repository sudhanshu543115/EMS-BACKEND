const express = require("express");
const router = express.Router();
const salaryController = require("./salary.controller");
const auth = require("../../middlewares/auth.middleware");
const allow = require("../../middlewares/role.middleware");

// Only Admin/HR can manage salaries
router.post("/generate", auth, allow("hr"), salaryController.generateSalary);
router.get("/history/:employeeId", auth, salaryController.getSalaryHistory);
router.patch("/status", auth, allow("admin"), salaryController.updatePaymentStatus);

module.exports = router;
