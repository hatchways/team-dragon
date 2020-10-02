const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");
// const isAuth = require("../middleware/isAuth");

router.post("/register", authController.register);

router.post("/login", authController.login);

// router.post("/logout",isAuth, authController.logout);

router.post("/logout",passport.authenticate('jwt',{session:false}), authController.logout);

module.exports = router;
