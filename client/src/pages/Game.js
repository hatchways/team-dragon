import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid";
import Messenger from "../components/Messenger";
import Board from "../components/Board";
import { useGameSpyMaster } from ".././contexts/GameContext";
import socket from "../socket";

import Fab from "@material-ui/core/Fab"; // TEST

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
}));

const Match = (props) => {
  const classes = useStyles();
  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([]);
  const [isSpyMaster, setIsSpyMaster] = useGameSpyMaster();

  useEffect(() => {
    socket.emit("join", props.match.params.id, ({ name, history }) => {
      setName(name);
      setMessages(history);
    });

    socket.on("message", (msgData) => {
      // update message list
      setMessages((prevMessages) => [...prevMessages, msgData]);
    });

    // on connect retrieve the game board and set it?
    setBoard(sampleBoard);
  }, [props.match.params.id]);

  const sendMessage = (msg) => {
    const msgData = {
      id: uuid(),
      sender: name,
      message: msg,
    };

    // send message to the server
    socket.emit("message", msgData);
  };

  return (
    <div className={classes.root}>
      <Messenger
        spyMaster={isSpyMaster}
        currentUser={name}
        messages={messages}
        sendMessage={sendMessage}
      />
      <Board spyMaster={isSpyMaster} board={board} />

      {/* Test */}
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

export default Match;
