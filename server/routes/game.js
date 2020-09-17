const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.js');

router.post('/create-match', gameController.createMatch);

router.get('/match/:id', gameController.joinMatch);

// router.get('/match/join/:id', gameController.joinMatch);

router.get('/match/move/:playerId',gameController.playerMove);

module.exports = router;