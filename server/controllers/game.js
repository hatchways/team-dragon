const allMatches = require("../models/gameModel/allMatches");
const Game = require("../models/gameEngine/Game");
const Match = require("../models/gameModel/Match");
const User = require("../models/User");

exports.postCreateMatch = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({ success: false, error: "Please Sign in !" });
    }
    const hostId = req.user._id;
    // User id coming from request
    const user = await User.findOne({ _id: hostId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Initializing the match
    const gameEngine = new Game();

    // Add userId to gameEngine for current user
    gameEngine.setCurrentUser(user);

    const players = [
      {
        userId: user._id,
        name: user.name,
        matchId: gameEngine.id,
      },
    ];

    const match = new Match({
      matchId: gameEngine.id,
      hostId: user._id,
      players: players,
    });
    const result = await match.save();

    if (!result) {
      return res.status(404).json({ success: false, error: "Match not saved" });
    }

    // // Test JSON method
    // console.log("JSON", gameEngine.toJson());

    allMatches.addMatch(gameEngine.id, gameEngine);

    res.status(202).send({
      match: gameEngine,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};

