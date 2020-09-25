const jwt = require("jsonwebtoken");
const config = require("./config");

const { getIO } = require("./socket");
const allMatches = require("./models/gameModel/allMatches");
const User = require("./models/User");
let ioExport;
let socketExport;
module.exports = {
  init: () => {
    const io = getIO();
    ioExport = io;
    io.on("connection", (socket) => {
      socketExport = socket;
      console.log("new user connected to match socket");
      let errors = [];
      let matchRoom;
      // Socket listener for match rooms
      socket.on("join-match", ({ room, matchId, token }) => {
        try {
          let match;
          // authentication
          jwt.verify(token, config.secret, (err, decoded) => {
            if (!decoded) {
              errors.push({ name: err.name, message: err.message });
            }
            if (err) {
              throw err;
            }
            //Joining room
            matchRoom = room;
            socket.join(room);

            const { email } = decoded;
            User.findOne({ email: email })
              .then((user) => {
                if (!user) {
                  errors.push({
                    name: "NotFoundError",
                    message: "Email id does not exist!",
                  });
                  throw new Error("Email id does not exist in database!");
                }
                let newPlayer = {
                  id: user._id,
                  name: user.name,
                };

                if (!matchId) {
                  errors.push({
                    name: "UndefinedError",
                    message: "Match not created yet",
                  });
                  throw new Error("Match id is undefined or null");
                }
                let currentMatch = allMatches
                  .getAllMatches()
                  .get(parseInt(matchId));

                if (!currentMatch) {
                  errors.push({
                    name: "UndefinedError",
                    message: "Match not found",
                  });
                  throw new Error("Match does not exist!");
                }
                currentMatch.joinMatch(newPlayer);
                match = currentMatch;
                // Send updated players array to front
                io.to(room).emit("update-players", { match, errors });
              })
              .catch((err) => {
                console.log(err);
                console.log("errors: ", errors);
              });
          });
        } catch (err) {
          console.log(err);
        }
      });

      // Receive assigned roles emitted from FE
      socket.on("start-game", ({ matchId, players }) => {
        try {
          let currentMatch = allMatches.getAllMatches().get(parseInt(matchId));

          if (!currentMatch) {
            errors.push({
              name: "UndefinedError",
              message: "Match not found",
            });
            throw new Error("Match does not exist!");
          }

          players.forEach(({ id, name, team, spyMaster }) => {
            // Assign team to each player
            currentMatch.assignTeam({ id, name }, team);

            // Assign role to each player
            if (!spyMaster) {
              currentMatch.assignRole(id, "guesser");
            } else {
              currentMatch.assignRole(id, "spy-master");
            }
          });

          currentMatch.startGame();
          io.to(matchRoom).emit("update-roles", currentMatch);
        } catch (err) {
          console.log(err);
        }
      });

      // Socket listener for next move
      socket.on("move", ({ matchId, playerId, cardIndex }) => {
        let currentMatch = allMatches.getAllMatches().get(parseInt(matchId));
        currentMatch.pickCard(playerId, cardIndex); // Result of the move would be in console for now
      });
    });
  },
  getMatchIO: () => {
    return ioExport;
  },
  getMatchSocket: () => {
    return socketExport;
  },
};
