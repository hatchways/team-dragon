const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");

router.post("/create-game", gameController.postCreateGame);

module.exports = router;
