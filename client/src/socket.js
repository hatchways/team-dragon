import io from "socket.io-client";
const socket = io("http://localhost:3001");

socket.on("error", (errors) => {
  console.log(errors);
});

export default socket;
