const express = require("express");
const router = express.Router();
const controller = require("./auditLogs.controller");
const auth = require("../../middlewares/auth.middleware");
const allow = require("../../middlewares/role.middleware");

router.get("/", auth, allow("super_admin"), controller.getLogs);

module.exports = router;
