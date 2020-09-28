const jwt = require("jsonwebtoken");
const config = require("./config");
const allGames = require("./models/gameModel/allGames");
const User = require("./models/User");

module.exports = (server) => {
  const io = require("socket.io")(server);
  const clientDetails = {};
  const roomDetails = {};

  io.on("connection", (socket) => {
    let errors = [];
    let gameRoom;

    // Socket listener for game rooms
    socket.on("join-game", ({ room, gameId, token }) => {
      try {
        let game;
        // Authentication
        jwt.verify(token, config.secret, (err, decoded) => {
          if (!decoded) {
            errors.push({ name: err.name, message: err.message });
          }
          if (err) {
            throw err;
          }
          // Joining room
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
              let currentGame = allGames.getAllGames().get(parseInt(gameId));

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
        let currentGame = allGames.getAllGames().get(parseInt(gameId));

        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          throw new Error("Game does not exist!");
        }

        players.forEach(({ id, name, team, spyMaster }) => {
          // Assign team to each player
          currentGame.assignTeam({ id, name }, team);

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

    socket.on("join", (recv, fn) => {
      // validate user token
      jwt.verify(recv.token, config.secret, (err, decoded) => {
        if (err) {
          socket.emit("redirect");
          return;
        }

        // join a game
        socket.join(recv.gameId);

        // create room details if does not exist
        if (roomDetails[recv.gameId] === undefined) {
          roomDetails[recv.gameId] = {
            state: allGames.getAllGames().get(parseInt(recv.gameId)),
            history: [],
          };
        }

        // assign user a name and store user details
        if (clientDetails[socket.id] === undefined) {
          clientDetails[socket.id] = {
            name: decoded.name,
            rooms: [recv.gameId],
          };
        }

        // update room of joining client
        const alert = {
          sender: "alert",
          message: `${decoded.name} joined the game`,
        };

        roomDetails[recv.gameId].history.push(alert);
        socket.to(recv.gameId).broadcast.emit("alert", alert);

        // return assigned name and chat history
        fn({
          name: decoded.name,
          state: roomDetails[recv.gameId].state,
          history: roomDetails[recv.gameId].history,
        });
      });
    });

    // SOcket listener for messenger
    socket.on("message", (recv) => {
      // save message into history
      roomDetails[recv.gameId].history.push(recv.msgData);

      // update other clients with the message
      io.to(recv.gameId).emit("message", recv.msgData);
    });

    // Socket listener for next move
    socket.on("move", ({ gameId, playerId, cardIndex }) => {
      let currentGame = allGames.getAllGames().get(parseInt(gameId));
      currentGame.pickCard(playerId, cardIndex); // Result of the move would be in console for now
    });

    // clean up when a user disconnects
    socket.on("disconnect", () => {
      // lookup the disconnecting user and remove
      const user = clientDetails[socket.id];
      if (user !== undefined) {
        user.rooms.forEach((room) => {
          const alert = {
            sender: "alert",
            message: `${user.name} left the game`,
          };

          roomDetails[room].history.push(alert);
          io.to(room).emit("alert", alert);
        });

        delete clientDetails[socket.id];
      }
    });
  });
};
