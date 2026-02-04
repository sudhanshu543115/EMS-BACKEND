const router = require("express").Router();
const { login } = require("./auth.controllers");

router.post("/login", login);

module.exports = router;
