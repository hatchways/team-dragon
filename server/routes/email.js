const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.js");
const passport = require("passport");

router.post(
  "/send-email",
  passport.authenticate("jwt", { session: false }),
  emailController.sendEmail,
);

module.exports = router;
