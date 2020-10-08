const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");
const passport = require("passport");

router.post(
  "/create-game",
  passport.authenticate("jwt", { session: false }),
  gameController.postCreateGame,
);

module.exports = router;
