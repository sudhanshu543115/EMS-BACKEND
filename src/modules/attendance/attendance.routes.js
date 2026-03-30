const express = require("express");
const router = express.Router();
const attendanceController = require("./attendance.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/check-in", auth, attendanceController.checkIn);
router.post("/check-out", auth, attendanceController.checkOut);
router.get("/history/:employeeId", auth, attendanceController.getAttendanceHistory);

module.exports = router;
