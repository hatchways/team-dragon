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

      let matchRoom;
      // Socket listener for match rooms
      socket.on("join-match", ({ room, matchId, userEmail }) => {
        matchRoom = room;
        socket.join(room);
        User.findOne({ email: userEmail })
          .then((user) => {
            if (!user) {
              throw new Error("User does not exist!");
            }
            let newPlayer = {
              id: user._id,
              name: user.name,
            };
            let currentMatch = allMatches
              .getAllMatches()
              .get(parseInt(matchId));
            currentMatch.joinMatch(newPlayer);
            // Send updated players array to front
            io.to(room).emit("update-players", currentMatch);
          })
          .catch((err) => console.log(err));
      });

      // Receive assigned roles emitted from FE
      socket.on("start-game", ({ matchId, players }) => {
        let currentMatch = allMatches.getAllMatches().get(parseInt(matchId));
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
        console.log("Updated game after assigned roles: ", currentMatch);
        io.to(matchRoom).emit("update-roles", currentMatch);
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
