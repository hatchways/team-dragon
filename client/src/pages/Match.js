import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid";
import Messenger from "../components/Messenger";
import Board from "../components/Board";
import socket from "../socket";

const sampleBoard = [
  { word: "1", type: "blue", clicked: true },
  { word: "2", type: "blue", clicked: false },
  { word: "3", type: "blue", clicked: false },
  { word: "4", type: "blue", clicked: false },
  { word: "5", type: "blue", clicked: false },
  { word: "6", type: "blue", clicked: false },
  { word: "7", type: "blue", clicked: false },
  { word: "8", type: "blue", clicked: false },
  { word: "9", type: "red", clicked: false },
  { word: "10", type: "red", clicked: false },
  { word: "11", type: "red", clicked: false },
  { word: "12", type: "red", clicked: true },
  { word: "13", type: "red", clicked: false },
  { word: "14", type: "red", clicked: false },
  { word: "15", type: "red", clicked: false },
  { word: "16", type: "red", clicked: false },
  { word: "17", type: "assassin", clicked: false },
  { word: "18", type: "innocent", clicked: false },
  { word: "19", type: "innocent", clicked: false },
  { word: "20", type: "innocent", clicked: true },
  { word: "21", type: "innocent", clicked: false },
  { word: "22", type: "innocent", clicked: false },
  { word: "23", type: "innocent", clicked: false },
  { word: "24", type: "innocent", clicked: false },
  { word: "25", type: "innocent", clicked: false },
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
        currentUser={name}
        messages={messages}
        sendMessage={sendMessage}
      />
      <Board spyMaster board={board} />
    </div>
  );
};

export default Match;
