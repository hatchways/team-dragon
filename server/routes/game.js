const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");
const passport = require('passport');
// const isAuth = require("../middleware/isAuth");

// router.post("/create-game",isAuth, gameController.postCreateGame);

router.post("/create-game",passport.authenticate('jwt',{session:false}), gameController.postCreateGame);

module.exports = router;
