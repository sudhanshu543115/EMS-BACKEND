const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/users", require("./src/modules/users/user.routes"));
app.use("/api/roles", require("./src/modules/roles/role.routes"));

module.exports = app;
