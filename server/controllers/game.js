
const Game = require("../models/gameEngine/Game");
const Match = require("../models/gameModel/Match");
const User = require("../models/User");
let globalState = {};

exports.createMatch = async (req, res, next) => {
  try {
    // Hard coded data to be replaced by real users
    const player1 = {
      id: 12345,
      name: "John",
    };
    const player2 = {
      id: 13255,
      name: "Derrick",
    };

    const hostId = req.user._id;
    // User id coming from request
    const user = await User.findOne({ _id: hostId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errors: { email: "Email does not exist" } });
    }

    // Initializing the match
    const gameEngine = new Game();
    const match = await new Match({
      matchId: gameEngine.id,
      hostId: user._id,
    });
    const result = await match.save(err => console.log(err));
    // Assign Team to player
    gameEngine.assignTeam(player1, "red");
    gameEngine.assignTeam(player2, "blue");

    // Assign Roles
    gameEngine.assignRole(13255, "guesser");

    globalState = { gameEngine };

    res.status(202).json({
      match: globalState.gameEngine
    })

    // res.redirect(`/match/${globalState.gameEngine.id}`);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

exports.getMatch = (req, res, next) => {
  res.json({ globalState });
};

exports.joinMatch = (req, res, next) => {
  res.send(`<h1>Joining Match ${req.params.id}</h1>`);
};

exports.playerMove = (req, res, next) => {
  const playerId = req.params.playerId;
  // User picks a card
  globalState.gameEngine.pickCard(13255, playerId);

  res.json({ globalState });
};
