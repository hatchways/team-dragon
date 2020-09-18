let socketExp;
exports.socket = (server) => {
  const io = require("socket.io")(server);

  // // Allow CORS 
  // io.origins('*:*');

  io.on("connection", socket => {
    console.log('client connected');
    socketExp = socket;
    socket.on("message", msg => {
      console.log('recieved message', msg);
      socket.emit('message', msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    })
  });
}

exports.getSocket = () => {
  return socketExp;
} 

