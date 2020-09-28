const allGames = require("../models/gameModel/allGames");
const GameEngine = require("../models/gameEngine/GameEngine");
const Game = require("../models/gameModel/Game");
const User = require("../models/User");

exports.postCreateGame = async (req, res, next) => {
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

    // Initializing the game
    const gameEngine = new GameEngine();

    // Add userId to gameEngine for current user
    gameEngine.setCurrentUser(user);

    const players = [
      {
        userId: user._id,
        name: user.name,
        gameId: gameEngine.id,
      },
    ];

    const game = new Game({
      gameId: gameEngine.id,
      hostId: user._id,
      players: players,
    });
    const result = await game.save();

    if (!result) {
      return res.status(404).json({ success: false, error: "Game not saved" });
    }

    // // Test JSON method
    // console.log("JSON", gameEngine.toJson());

    allGames.addGame(gameEngine.id, gameEngine);

    res.status(202).send({
      game: gameEngine,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};

