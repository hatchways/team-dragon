const allMatches = require("../models/gameModel/allMatches");
const Game = require("../models/gameEngine/Game");
const Match = require("../models/gameModel/Match");
const User = require("../models/User");

exports.postCreateMatch = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .json({ success: false, error: "Please Sign in !"});
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
    }
  }
};

// Left this to reuse the logic

// // Get route when a user joins the match
// exports.joinMatch = async (req, res, next) => {
//   // If Match id is undefined
//   if (!req.params.id) {
//     return res.status(404).json({
//       success: false,
//       errors: { err: "Match id not provided" },
//     });
//   }

//   const matchId = req.params.id;
//   // If user is not signed in yet
//   if (!req.user) {
//     return res.status(404).json({
//       success: false,
//       errors: { err: "User not signed in" },
//     });
//   }
//   const userId = req.user._id;

//   try {
//     //Find match using id
//     const match = await Match.findOne({ matchId: matchId });

//     if (!match) {
//       return res.status(404).json({
//         success: false,
//         errors: { err: "Match doesn't exist" },
//       });
//     }

//     // User id coming from request
//     let user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, errors: { err: "User does not exist" } });
//     }

//     let playerDoc = await Match.find({ matchId: matchId }).find({
//       "players.userId": userId,
//     });
//     // console.log("Match found:",playerDoc[0])

//     // If user was already in match
//     if (playerDoc[0]) {
//       console.log("Welcome back to match", playerDoc);

//       return res.status(200).json({ match: match });
//     }

//     // Fetch players array from current match
//     // const currentPlayers = match.players;
//     let newPlayer = {
//       userId: user._id,
//       name: user.name,
//       matchId: matchId,
//     };
//     match.players.push(newPlayer);
//     const result = await match.save();
//     console.log("Player joined:", user);

//     let currentMatch = allMatches.getAllMatches().get(parseInt(matchId));
//     currentMatch.joinMatch(newPlayer);
//     currentMatch.setCurrentUser(user);

//     res.status(200).json({ match: currentMatch });
//   } catch (err) {
//     if (err) {
//       console.log(err);
//     }
//   }
// };

// exports.playerMove = (req, res, next) => {
//   const playerId = req.params.playerId;
//   // User picks a card
//   globalState.gameEngine.pickCard(13255, playerId);

//   res.json({ globalState });
// };
