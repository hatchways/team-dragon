const Game = require("../models/gameEngine/Game");
const Match = require("../models/gameModel/Match");
const User = require("../models/User");
const Player = require("../models/gameModel/Players");
let globalState = {};

exports.postCreateMatch = async (req, res, next) => {
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
    const match = new Match({
      matchId: gameEngine.id,
      hostId: user._id,
    });
    const result = await match.save((err) => console.log(err));
    // Assign Team to player
    gameEngine.assignTeam(player1, "red");
    gameEngine.assignTeam(player2, "blue");

    // Assign Roles
    gameEngine.assignRole(13255, "guesser");

    globalState = { gameEngine };

    res.status(202).json({
      match: globalState.gameEngine,
    });

    // res.redirect(`/match/${globalState.gameEngine.id}`);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

exports.getCreateMatch = (req, res, next) => {
  res.status(202).json({
    match: globalState.gameEngine,
  });
};

exports.joinMatch = async (req, res, next) => {
  const matchId = req.params.id;
  const userId = req.user._id;
  try {
    //Find match using id
    const match = await Match.findOne({ matchId: matchId });

    if (!match) {
      return res.status(404).json({
        success: false,
        errors: { email: "Match doesn't exist" },
      });
    }

    // User id coming from request
    let user = await User.findOne({ _id: userId});
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errors: { email: "User does not exist" } });
    }

    let docPlayer = await Player.findOne({matchId:matchId});
    
    // If user was already in match
    if(docPlayer){
      console.log("Welcome back to match")
      return res.status(200).json({ match: globalState.gameEngine });
    }

    let player = new Player({ userId: user._id, name: user.name, matchId:matchId});
    const result = await player.save();
    console.log("Let's start the match")
    player = {
      name: player.name,
      matchId: player.matchId
    };
    globalState.gameEngine.joinMatch(player);
    res.status(200).json({ match: globalState.gameEngine });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

exports.playerMove = (req, res, next) => {
  const playerId = req.params.playerId;
  // User picks a card
  globalState.gameEngine.pickCard(13255, playerId);

  res.json({ globalState });
};
