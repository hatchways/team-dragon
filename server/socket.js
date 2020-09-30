const jwt = require("jsonwebtoken");
const config = require("./config");
const allGames = require("./models/gameEngine/allGames");
const User = require("./models/User");

module.exports = (server) => {
  const io = require("socket.io")(server);
  const clientDetails = {};
  const roomDetails = {};

  io.on("connection", (socket) => {
    const errors = [];
    let gameRoom;

    // Socket listener for game rooms
    socket.on("join-game", async (recv) => {
      const { room, gameId, token } = recv;

      try {
        let game;
        const decoded = jwt.verify(token, config.secret);
        if (!decoded) {
          throw new Error("Token not valid");
        }

        // Joining room
        gameRoom = room;
        socket.join(gameRoom);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          errors.push({
            name: "NotFoundError",
            message: "Email id does not exist!",
          });
          throw new Error("Email id does not exist in database");
        }

        const newPlayer = {
          id: user.id,
          name: user.name,
        };

        if (!gameId) {
          errors.push({
            name: "UndefinedError",
            message: "Game not created yet",
          });
          throw new Error("Game not created");
        }

        const currentGame = allGames.getGame(parseInt(gameId));
        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          throw new Error("Game does not Exist");
        }

        currentGame.joinGame(newPlayer);
        game = currentGame;

        io.to(gameRoom).emit("update-players", { game, errors });
      } catch (err) {
        console.log(err);
      }
    });

    // Receive assigned roles emitted from FE
    socket.on("start-game", (recv) => {
      const { gameId, players } = recv;

      try {
        const currentGame = allGames.getGame(parseInt(gameId));
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

    socket.on("init-game", (recv, fn) => {
      const { gameId, token } = recv;

      try {
        const decoded = jwt.verify(token, config.secret);
        if (!decoded) {
          throw new Error("Token not valid");
        }

        // join a game room
        socket.join(gameId);

        // create room details if does not exist
        if (roomDetails[gameId] === undefined) {
          roomDetails[gameId] = {
            state: allGames.getGame(parseInt(gameId)),
            history: [],
          };
        }

        // assign user a name and store user details
        if (clientDetails[socket.id] === undefined) {
          clientDetails[socket.id] = {
            name: decoded.name,
            rooms: [gameId],
          };
        }

        // update room of joining client
        const alert = {
          sender: "alert",
          message: `${decoded.name} joined the game`,
        };

        roomDetails[gameId].history.push(alert);
        socket.to(gameId).broadcast.emit("new-message", alert);

        // return assigned name and chat history
        fn({
          name: decoded.name,
          state: roomDetails[gameId].state,
          history: roomDetails[gameId].history,
        });
      } catch (err) {
        console.log(err);
        socket.emit("redirect");
      }
    });

    // Socket listener for messenger
    socket.on("message", (recv) => {
      const { gameId, token, msgData } = recv;

      const decoded = jwt.verify(token, config.secret);
      if (!decoded) {
        throw new Error("Token not valid");
      }

      // save message into history
      roomDetails[gameId].history.push(msgData);

      // update other clients with the message
      io.to(gameId).emit("new-message", msgData);
    });

    // Socket listener for next move
    socket.on("move", (recv) => {
      const { gameId, playerId, cardIndex } = recv;

      const currentGame = allGames.getGame(parseInt(gameId));
      currentGame.pickCard(playerId, cardIndex); // Result of the move would be in console for now
    });

    socket.on("change-turn", (recv) => {
      const { gameId } = recv;

      const currentGame = allGames.getGame(parseInt(gameId));
      currentGame.changeTurn();

      io.to(gameId).emit("update-game", currentGame);
    });

    // Clean up when a user disconnects
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
