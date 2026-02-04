const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const allow = require("../../middlewares/role.middleware");
const controller = require("./role.controller");

router.post("/", auth, allow("super_admin"), controller.createRole);
router.get("/", auth, allow("super_admin"), controller.getRoles);

module.exports = router;
