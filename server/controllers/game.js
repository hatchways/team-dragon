const { getSocket } = require("../socket");
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

    // Assign Team to player
    gameEngine.assignTeam(player1, "red");
    gameEngine.assignTeam(player2, "blue");

    // Assign Roles
    gameEngine.assignRole(13255, "guesser");

    globalState = { gameEngine };

    // getSocket().emit("matchState", {
    //   action: "create-match",
    //   match: globalState.gameEngine,
    // });

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

// Get route controller for create-match
exports.getCreateMatch = (req, res, next) => {
  res.status(202).json({
    match: globalState.gameEngine,
  });
};

// Get route when a user joins the match
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
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errors: { email: "User does not exist" } });
    }

    let playerDoc = await Match.find({
      "players.userId": userId,
      matchId: matchId,
    });

    // If user was already in match
    if (playerDoc) {
      console.log("Welcome back to match", playerDoc);

      const socket = getSocket();
      socket.emit("join-match", {
        match: globalState.gameEngine,
      });
      
      return res.status(200).json({ match: globalState.gameEngine });
    }

    // Fetch players array from current match
    const currentPlayers = match.players;
    let newPlayer = {
      userId: user._id,
      name: user.name,
      matchId: matchId,
    };
    match.players.push(newPlayer);
    const result = await match.save();
    console.log("Player joined:", user.name);

    player = {
      name: user.name,
      matchId: user.matchId,
    };
    globalState.gameEngine.joinMatch(player);

    // Join match room
    const socket = getSocket();
    socket.emit("join-match", {
      match: globalState.gameEngine,
    });
    // // Emit to all users
    // getSocket().in("match1").emit(
    //   "join-match-msg",
    //   `You are in match - ${matchId}`
    // );

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
