const { getIO } = require("./socket");
const allMatches = require("./models/gameModel/allMatches");
const Match = require("./models/gameModel/Match");
let ioExport;
let socketExport;
module.exports = {
  init: () => {
    const io = getIO();
    ioExport = io;
    io.on("connection", (socket) => {
      socketExport = socket;
      console.log("Match socket connected");

      socket.on("joinmatch", ({ room, matchId }) => {
        socket.join(room);
        Match.findOne({ matchId: matchId })
          .then((match) => {
            console.log(match.players);
            io.to(room).emit("updateplayers",match.players)
          })
          .catch((err) => console.log(err));
        io.to(room).emit("joinedmatch", "New user joined");
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
