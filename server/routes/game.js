const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");

router.post("/create-match", gameController.postCreateMatch);

router.get("/create-match", gameController.getCreateMatch);

// router.post("/match/:id", gameController.joinMatch);

// router.get("/match/move/:playerId", gameController.playerMove);

module.exports = router;
