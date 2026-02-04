const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const allow = require("../../middlewares/role.middleware");
const controller = require("./user.controller");

router.post("/", auth, allow("super_admin"), controller.createUser);
router.get("/", auth, allow("super_admin"), controller.getUsers);

module.exports = router;
