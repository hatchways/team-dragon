module.exports = (server) => {
  const io = require("socket.io")(server);

  let message_id = 0;
  const chatDetails = {
    history: [],
    users: [],
    typing: [],
  }

  io.on("connection", socket => {
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
      chatDetails.history.unshift({ 
        id: message_id++,
        sender: data.sender,
        message:  data.message,
      });
      socket.broadcast.emit('message', chatDetails.history);
    });

    socket.on('disconnect', () => {
      // update users currently in the chat
      chatDetails.users = chatDetails.users.filter( 
        user => user.id !== socket.id
      );
    })
  })
}
