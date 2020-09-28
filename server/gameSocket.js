const jwt = require("jsonwebtoken");
const config = require("./config");

const { getIO } = require("./socket");
const allGames = require("./models/gameModel/allGames");
const User = require("./models/User");
let ioExport;
let socketExport;
module.exports = {
  init: () => {
    const io = getIO();
    ioExport = io;
    io.on("connection", (socket) => {
      socketExport = socket;
      console.log("new user connected to game socket");
      let errors = [];
      let gameRoom;
      // Socket listener for match rooms
      socket.on("join-game", ({ room, gameId, token }) => {
        try {
          let game;
          // authentication
          jwt.verify(token, config.secret, (err, decoded) => {
            if (!decoded) {
              errors.push({ name: err.name, message: err.message });
            }
            if (err) {
              throw err;
            }
            //Joining room
            gameRoom = room;
            socket.join(gameRoom);

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

                if (!gameId) {
                  errors.push({
                    name: "UndefinedError",
                    message: "Game not created yet",
                  });
                  throw new Error("Game id is undefined or null");
                }
                let currentGame = allGames
                  .getAllGames()
                  .get(parseInt(gameId));

                if (!currentGame) {
                  errors.push({
                    name: "UndefinedError",
                    message: "Game not found",
                  });
                  throw new Error("Game does not exist!");
                }
                currentGame.joinGame(newPlayer);
                game = currentGame;
                // Send updated players array to front
                io.to(gameRoom).emit("update-players", { game, errors });
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
      socket.on("start-game", ({ gameId, players }) => {
        try {
          let currentGame = allGame.getAllGames().get(parseInt(gameId));

          if (!currentGame) {
            errors.push({
              name: "UndefinedError",
              message: "Game not found",
            });
            throw new Error("Game does not exist!");
          }

          players.forEach(({ id, name, team, spyMaster }) => {
            // Assign team to each player
            currentMatch.assignTeam({ id, name }, team);

            // Assign role to each player
            if (!spyMaster) {
              currentGame.assignRole(id, "guesser");
            } else {
              currentGame.assignRole(id, "spy-master");
            }
          });

          currentGame.startGame();
          io.to(gameRoom).emit("update-roles", currentGame);
        } catch (err) {
          console.log(err);
        }
      });

      // Socket listener for next move
      socket.on("move", ({ gameId, playerId, cardIndex }) => {
        let currentGame = allGames.getAllGames().get(parseInt(gameId));
        currentGame.pickCard(playerId, cardIndex); // Result of the move would be in console for now
      });
    });
  },
  getGameIO: () => {
    return ioExport;
  },
  getGameSocket: () => {
    return socketExport;
  },
};
