module.exports = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    console.log('client connected');

    socket.on("message", msg => {
      console.log('recieved message', msg);
      socket.emit('message', msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    })
  })
}
