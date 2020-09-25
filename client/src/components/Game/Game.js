import React, { useState, useEffect } from "react";
import GameBar from "../GameBar";
import Messenger from "../Messenger";
import Board from "../Board";
import socket from "../../socket";
import useStyles from "./styles";

const Game = (props) => {
  const classes = useStyles();
  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([]);
  const [isSpyMaster, setSpyMaster] = useState(false);

  const gameId = props.match.params.id;
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    // join the match
    socket.emit("join", { token, gameId }, (recv) => {
      console.log(recv);

      setName(recv.name);
      setMessages(recv.history);
      setBoard(recv.state.board);

      // search game stare to find role of this user
      const redPlayers = recv.state.redTeam.players;
      const bluePlayers = recv.state.blueTeam.players;

      const redIdx = redPlayers.findIndex((p) => p.name === recv.name);
      const blueIdx = bluePlayers.findIndex((p) => p.name === recv.name);

      if (redIdx > -1) {
        if (redPlayers[redIdx].role === "spy-master") {
          setSpyMaster(true);
        }
      } else if (blueIdx > -1) {
        if (bluePlayers[blueIdx].role === "spy-master") {
          setSpyMaster(true);
        }
      }
    });

    socket.on("message", (recv) => {
      // update message list
      setMessages((prevMessages) => [...prevMessages, recv]);
    });

    socket.on("alert", (recv) => {
      setMessages((prevMessages) => [...prevMessages, recv]);
    });

    socket.on("redirect", () => {
      console.log("user not valid");
      // props.history.push("/login");
    });
  }, [gameId, token]);

  const sendMessage = (msg) => {
    const msgData = {
      sender: name,
      message: msg,
    };

    // send message to the server
    socket.emit("message", {
      token,
      gameId,
      msgData,
    });
  };

  return (
    <div className={classes.game}>
      <GameBar />
      <div className={classes.gameArea}>
        <Messenger
          spyMaster={isSpyMaster}
          currentUser={name}
          messages={messages}
          sendMessage={sendMessage}
        />
        <Board spyMaster={isSpyMaster} board={board} />
      </div>
    </div>
  );
};

export default Game;
