const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const passport = require("passport");
// const isAuth = require("../middleware/isAuth");

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
