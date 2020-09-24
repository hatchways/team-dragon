import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab"; // TEST
import GameBar from "../GameBar";
import Messenger from "../Messenger";
import Board from "../Board";
import { useGameSpyMaster } from "../../contexts/GameContext";
import socket from "../../socket";

const sampleBoard = [
  { word: "switch", type: "blue", clicked: true },
  { word: "manga", type: "blue", clicked: false },
  { word: "moon", type: "blue", clicked: false },
  { word: "octopus", type: "blue", clicked: false },
  { word: "change", type: "blue", clicked: false },
  { word: "orange", type: "blue", clicked: false },
  { word: "point", type: "blue", clicked: false },
  { word: "police", type: "blue", clicked: false },
  { word: "ghost", type: "red", clicked: false },
  { word: "wave", type: "red", clicked: false },
  { word: "casino", type: "red", clicked: false },
  { word: "lemur", type: "red", clicked: true },
  { word: "mug", type: "red", clicked: false },
  { word: "chicken", type: "red", clicked: false },
  { word: "dog", type: "red", clicked: false },
  { word: "apple", type: "red", clicked: false },
  { word: "beach", type: "assassin", clicked: false },
  { word: "tail", type: "innocent", clicked: false },
  { word: "staff", type: "innocent", clicked: false },
  { word: "ball", type: "innocent", clicked: true },
  { word: "iron", type: "innocent", clicked: false },
  { word: "car", type: "innocent", clicked: false },
  { word: "air", type: "innocent", clicked: false },
  { word: "cherry", type: "innocent", clicked: false },
  { word: "ball", type: "innocent", clicked: false },
];

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "12vh 88vh",
  },
  gameArea: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
}));

const Game = (props) => {
  const classes = useStyles();
  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([]);
  const [isSpyMaster, setIsSpyMaster] = useGameSpyMaster();

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

    // on connect retrieve the game board and set it?
    setBoard(sampleBoard);
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
    <div className={classes.root}>
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

      <Fab
        style={{
          position: "absolute",
          left: "5px",
          bottom: "5px",
        }}
        color="primary"
        onClick={() => setIsSpyMaster(!isSpyMaster)}
      >
        {isSpyMaster ? "SP" : "G"}
      </Fab>
    </div>
  );
};

export default Game;
