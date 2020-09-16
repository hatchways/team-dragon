module.exports = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    console.log('client connected');

    socket.on('disconnect', () => {
      console.log('client disconnected');
    })
  })
}
