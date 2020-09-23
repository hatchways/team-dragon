const jwt = require("jsonwebtoken");
const config = require("./config");

let ioExport;

exports.socket = (server) => {
  const io = require("socket.io")(server);
  const clientDetails = {};
  const roomDetails = {};

  ioExport = io;

  io.on("connection", (socket) => {
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
          console.log("creating room:", recv.gameId);
          roomDetails[recv.gameId] = {
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
          history: roomDetails[recv.gameId].history,
        });
      });
    });

    socket.on("message", (recv) => {
      // save message into history
      roomDetails[recv.gameId].history.push(recv.msgData);

      // update other clients with the message
      io.to(recv.gameId).emit("message", recv.msgData);
    });

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

exports.getIO = () => {
  if (!ioExport) {
    console.log("io not initialized!");
  }

  return ioExport;
};
