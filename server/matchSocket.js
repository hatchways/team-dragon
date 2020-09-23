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

      // Socket listener for match rooms
      socket.on("join-match", ({ room, matchId, userEmail }) => {
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
            console.log('currentMatch-LOOK HERE', currentMatch)
            // Send updated players array to front
            io.to(room).emit("update-players", currentMatch);
          })
          .catch((err) => console.log(err));
      });

      // Socket listener for next move
      socket.on("move", ({ matchId, playerId, cardIndex }) => {
        let currentMatch = allMatches.getAllMatches().get(matchId); //make sure matchId is not a string
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
