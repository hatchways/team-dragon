const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.js");
const passport = require("passport");
// const isAuth = require("../middleware/isAuth");

// router.post("/send-email",isAuth, emailController.sendEmail);

router.post("/send-email",passport.authenticate('jwt',{session:false}), emailController.sendEmail);

module.exports = router;
