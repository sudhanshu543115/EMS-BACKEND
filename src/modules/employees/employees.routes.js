const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const allow = require("../../middlewares/role.middleware");
const controller = require("./employees.controllers");

// CRUD routes for employees
router.post("/", auth, allow("super_admin", "hr"), controller.createEmployee);
router.get("/", auth, controller.getEmployees);
router.get("/:id", auth, controller.getEmployeeById);
router.patch("/:id", auth, allow("super_admin", "hr"), controller.updateEmployee);
router.delete("/:id", auth, allow("super_admin"), controller.deleteEmployee);

module.exports = router;
