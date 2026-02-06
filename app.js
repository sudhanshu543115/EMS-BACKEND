const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/employees", require("./src/modules/employees/employees.routes"));
app.use("/api/roles", require("./src/modules/roles/role.routes"));
app.use("/api/companies", require("./src/modules/companies/company.routes"));

module.exports = app;
