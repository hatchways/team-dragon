const allMatches = require("./models/gameModel/allMatches");
exports.socket = (server) => {
  const io = require("socket.io")(server);

  let message_id = 0;
  const roomDetails = {};

  io.on("connection", (socket) => {
    console.log("user connected");

    // Waiting room for players
    socket.on("joinMatch", ({ match }) => {
      // User joins the match
      socket.join(match.id);
      const user = match.currentUser;

      // User joining notification to the all players
      socket.emit("userjoined", `${user.name} joined the match`);
    });

    socket.on("join", (room, fn) => {
      // join a room
      socket.join(room);
      if (roomDetails[room] == undefined) {
        // create room details if does not exist
        roomDetails[room] = {
          history: [],
          users: [],
        };
      }

      // assign user a name and store user details
      const assignedName = "guest-" + socket.id.substr(0, 5);
      const user = { id: socket.id, name: assignedName };
      roomDetails[room].users.push(user);

      // return assigned name and chat history
      fn({
        name: assignedName,
        history: roomDetails[room].history,
      });
    });

    socket.on("message", (room, { sender, message }) => {
      // save message into history and update all clients
      roomDetails[room].history.unshift({
        id: message_id++,
        sender,
        message,
      });

      io.to(room).emit("message", roomDetails[room].history);
    });

    socket.on("leave", (room) => {
      // update users currently in the chat
      roomDetails[room].users = roomDetails[room].users.filter(
        (user) => user.id !== socket.id
      );
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
