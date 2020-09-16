const Game = require("../models/gameEngine/Game");
let globalState = {};
exports.createMatch = (req, res, next) => {

  // Hard coded data to be replaced by real users
  const player1 = {
    id: 12345,
    name: "John",
  };
  const player2 = {
    id: 13255,
    name: "Derrick",
  };

  // Initializing the match
  const match = new Game();

  // Assign Team to player
  match.assignTeam(player1,"red");
  match.assignTeam(player2,"blue");

  // Assign Roles
  match.assignRole(13255,"guesser");

  globalState = {match};
  if (!match) {
    return res.status(404).send({ response: "Match not found!" });
  }
  res.redirect(`/match/${globalState.match.id}`);
};

exports.getMatch = (req, res, next) => {
  
  res.json({globalState})
};

exports.joinMatch = (req, res, next) => {
  res.send(`<h1>Joining Match ${req.params.id}</h1>`);
};

exports.playerMove = (req, res, next) => {
  const playerId = req.params.playerId;
  // User picks a card 
  globalState.match.pickCard(13255,playerId);

  res.json({globalState})
};
