let ioExport;

exports.socket = (server) => {
  const io = require("socket.io")(server);
  const roomDetails = {};

  ioExport = io;

  io.on("connection", socket => {
    console.log('a user connected');

    let socket_roomId; // to store current room

    socket.on("join", (room, fn) => {
      // join a room
      socket.join(room);
      socket_roomId = room;
      
      if(roomDetails[room] == undefined) {
        // create room details if does not exist
        console.log('creating room:', room);
        roomDetails[room] = {
          history: [],
          users: [],
        }
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

    socket.on("message", msgData => {
      console.log("message recieved:", msgData);

      // save message into history
      roomDetails[socket_roomId].history.push(msgData);

      // update other clients with the message
      io.to(socket_roomId).emit('message', msgData);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');

      // update users currently in the chat
      roomDetails[socket_roomId].users = roomDetails[socket_roomId].users.filter( 
        user => user.id !== socket.id
      );
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  });
};

exports.getIO = () => {
  if (!ioExport) {
    console.log("io not initialized!");
  }
  
  return ioExport;
};
