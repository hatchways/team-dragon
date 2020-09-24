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

  const gameId = props.match.params.id;
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    // join the match
    socket.emit("join", { token, gameId }, (recv) => {
      setName(recv.name);
      setMessages(recv.history);
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

  if(props.game) {
    return (
      <div className={classes.game}>
        <GameBar />
        <div className={classes.gameArea}>
          <Messenger
            currentUser={name}
            messages={messages}
            sendMessage={sendMessage}
          />
          <Board board={props.game.board} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Game;
