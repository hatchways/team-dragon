const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.js");
const isAuth = require("../middleware/isAuth");

router.post("/send-email",isAuth, emailController.sendEmail);

module.exports = router;
