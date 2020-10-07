const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("./models/User");
const Game = require("./models/Game");
const GameEngine = require("./models/gameEngine/GameEngine");
const Timer = require("./models/gameEngine/Timer");
const cookie = require("cookie");

module.exports = (server) => {
  const io = require("socket.io")(server);
  const clientDetails = {};
  const roomDetails = {};

  io.use(function (socket, next) {
    if (socket.handshake.headers && socket.handshake.headers.cookie) {
      const token = cookie.parse(socket.handshake.headers.cookie).token;
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    // Listener to regulary update game
    socket.on("fetch-game", async (recv) => {
      const { gameId } = recv;
      const currentGame = await GameEngine.getGame(gameId);
      io.to(gameId).emit("update-game", currentGame);
    });

    // Socket listener for game rooms
    socket.on("join-game", async (recv) => {
      const token = cookie.parse(socket.handshake.headers.cookie).token;
      const { gameId } = recv;
      const errors = [];

      try {
        const game = await Game.findOne({ gameId });
        if (!game) {
          errors.push({
            name: "UndefinedError",
            message: "Game not created yet",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Game not created");
        }

        const decoded = jwt.verify(token, config.secret);
        // Removed - validation happens on socket connection.
        // if (!decoded) {
        //   errors.push({
        //     name: "InvalidToken",
        //     message: "Token not valid",
        //   });
        //   io.to(socket.id).emit("error", errors);
        //   throw new Error("Token not valid");
        // }

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          errors.push({
            name: "NotFoundError",
            message: "Email id does not exist!",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Email id does not exist in database");
        }

        // Joining room
        socket.join(gameId);

        // create room details if does not exist
        if (roomDetails[gameId] === undefined) {
          roomDetails[gameId] = {
            messages: [],
            clients: [socket.id],
            timer: new Timer(io, gameId),
          };
        } else {
          const isClient = (el) => el === socket.id;
          if (roomDetails[gameId].clients.findIndex(isClient) == -1) {
            roomDetails[gameId].clients.push(socket.id);
          }
        }

        // assign user a name and store user details
        if (clientDetails[socket.id] === undefined) {
          clientDetails[socket.id] = {
            name: decoded.name,
            rooms: [gameId],
          };
        }

        const newPlayer = {
          id: user.id,
          name: user.name,
        };

        const currentGame = await GameEngine.getGame(gameId);
        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Game does not Exist");
        }

        currentGame.joinGame(newPlayer);
        await currentGame.save();

        io.to(gameId).emit("update-players", currentGame);
      } catch (err) {
        console.error(err);
      }
    });

    // Receive assigned roles emitted from FE
    socket.on("start-game", async (recv) => {
      const { gameId, players } = recv;
      const errors = {};

      try {
        const currentGame = await GameEngine.getGame(gameId);
        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          io.to(socket.id).emit("error", errors);
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

        // Team List for Display
        currentGame.createTeamList(
          currentGame.redTeam.players,
          currentGame.blueTeam.players,
        );

        currentGame.startGame();
        await currentGame.save();

        // start the turn timer
        roomDetails[gameId].timer.start();

        io.to(gameId).emit("update-roles", currentGame);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("init-game", async (recv, fn) => {
      const { gameId } = recv;

      // update room of joining client
      const alert = {
        sender: "alert",
        message: `${clientDetails[socket.id].name} joined the game`,
      };

      roomDetails[gameId].messages.push(alert);
      socket.to(gameId).broadcast.emit("new-message", alert);

      // return assigned name and chat messages
      fn({
        name: clientDetails[socket.id].name,
        state: await GameEngine.getGame(gameId),
        messages: roomDetails[gameId].messages,
      });
    });

    // Socket listener for messenger
    socket.on("message", (recv) => {
      const { gameId, msgData } = recv;

      // save message into messages
      roomDetails[gameId].messages.push(msgData);

      // update other clients with the message
      io.to(gameId).emit("new-message", msgData);
    });

    // Socket listener for next move
    socket.on("move", async (recv) => {
      const { gameId, currentTurn, cardIndex } = recv;

      const currentGame = await GameEngine.getGame(gameId);
      currentGame.pickCard(currentTurn, cardIndex); // Result of the move would be in console for now
      await currentGame.save();

      // reset timer if turn changed
      if (currentGame.turn !== currentTurn) {
        roomDetails[gameId].timer.start();
      }

      io.to(gameId).emit("update-game", currentGame);
    });

    socket.on("change-turn", async (recv) => {
      const { gameId } = recv;

      // Stop the timer
      roomDetails[gameId].timer.stop();

      const currentGame = await GameEngine.getGame(gameId);
      currentGame.changeTurn();
      await currentGame.save();

      // Restart the timer
      roomDetails[gameId].timer.start();

      io.to(gameId).emit("update-game", currentGame);
    });

    // Listener to end game
    socket.on("end-game", async (recv) => {
      console.log("recv", recv);
      const { gameId, winner, method } = recv;
      console.log("WINNER", winner);

      const currentGame = await GameEngine.getGame(gameId);
      currentGame.gameOver(winner, method);
      await currentGame.save();

      // Stop the timer
      roomDetails[gameId].timer.stop();

      io.to(gameId).emit("update-game", currentGame);
    });

    //Play again
    socket.on("play-again", async (gameId) => {
      const currentGame = await GameEngine.getGame(gameId);
      currentGame.playAgain();
      await currentGame.save();

      io.to(gameId).emit("play-again", currentGame);
    });

    // Listener to regulary update game
    socket.on("fetch-game", async (recv) => {
      console.log("recv", recv);
      const { gameId } = recv;
      console.log("Update game");

      const currentGame = await GameEngine.getGame(gameId);

      io.to(gameId).emit("fetch-game", currentGame);
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

          roomDetails[room].messages.push(alert);
          roomDetails[room].clients = roomDetails[room].clients.filter(
            (client) => client !== socket.id,
          );

          // delete the room if all clients are gone
          if (!roomDetails[room].clients.length) {
            roomDetails[room].timer.stop();
            delete roomDetails[room];
          }

          io.to(room).emit("new-message", alert);
        });

        // remove client data from socket
        delete clientDetails[socket.id];
      }
    });
  });
};
