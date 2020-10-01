const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");
const isAuth = require("../middleware/isAuth");

router.post("/create-game",isAuth, gameController.postCreateGame);

module.exports = router;
