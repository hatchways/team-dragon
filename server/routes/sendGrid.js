const express = require("express");
const router = express.Router();
const gameController = require("../controllers/sendGrid.js");

router.post("/send-email", gameController.sendEmail);

module.exports = router;
