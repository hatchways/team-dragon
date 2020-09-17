module.exports = (server) => {
  const io = require("socket.io")(server);

  const chatDetails = {
    history: [],
    users: [],
    typing: [],
  }

  io.on("connection", socket => {
    console.log('a user connected');

    socket.on("join", fn => {
      // assign user a name and store user details
      const assignedName = "guest-" + socket.id.substr(0, 5);
      const user = { id: socket.id, name: assignedName };
      chatDetails.users.push(user);

      // return assigned name and chat history
      fn({ 
        name: assignedName,
        history: chatDetails.history,  
      });
    });

    socket.on("message", data => {
      // save message into history and update all clients
      chatDetails.history.unshift(data);
      io.emit('message', chatDetails.history);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    })
  })
}
