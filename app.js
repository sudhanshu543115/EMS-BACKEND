const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/employees", require("./src/modules/employees/employees.routes"));
app.use("/api/roles", require("./src/modules/roles/role.routes"));
app.use("/api/companies", require("./src/modules/companies/company.routes"));
app.use("/api/attendance", require("./src/modules/attendance/attendance.routes"));
app.use("/api/salary", require("./src/modules/salary/salary.routes"));
app.use("/api/audit-logs", require("./src/modules/auditLogs/auditLogs.routes"));

module.exports = app;
