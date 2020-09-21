import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import Messenger from "../components/Messenger";
import Board from "../components/Board";
import socket from "../socket";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateColumns: "450px 1fr",
    gridTemplateRows: "auto",
  },
}));

const Match = (props) => {
  const classes = useStyles();

  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState(new Array(25).fill("test"));

  useEffect(() => {
    socket.emit("join", props.match.params.id, ({ name, history }) => {
      setName(name);
      setMessages(history); 
    });

    socket.on("message", msgData => {
      // update message list
      setMessages(prevMessages => [...prevMessages, msgData]);
    });
  }, [props.match.params.id]);

  const sendMessage = (msg) => {
    const msgData = {
      id: uuid(),
      sender: name,
      message: msg,
    }

    // send message to the server
    socket.emit("message", msgData);
  }

  return (
    <div className={classes.root}>
      <Messenger
        currentUser={name}
        messages={messages}
        sendMessage={sendMessage}
      />
      <Board board={board} />
    </div>
  );
}

export default Match;
