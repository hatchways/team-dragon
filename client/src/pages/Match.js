import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import Messenger from "../components/Messenger";
import Board from "../components/Board";
import socket from "../socket";

const sampleBoard = [
  {word: '1', type: 'blue'},
  {word: '2', type: 'blue'},
  {word: '3', type: 'blue'},
  {word: '4', type: 'blue'},
  {word: '5', type: 'blue'},
  {word: '6', type: 'blue'},
  {word: '7', type: 'blue'},
  {word: '8', type: 'blue'},
  {word: '9', type: 'red'},
  {word: '10', type: 'red'},
  {word: '11', type: 'red'},
  {word: '12', type: 'red'},
  {word: '13', type: 'red'},
  {word: '14', type: 'red'},
  {word: '15', type: 'red'},
  {word: '16', type: 'red'},
  {word: '17', type: 'assassin'},
  {word: '18', type: 'innocent'},
  {word: '19', type: 'innocent'},
  {word: '20', type: 'innocent'},
  {word: '21', type: 'innocent'},
  {word: '22', type: 'innocent'},
  {word: '23', type: 'innocent'},
  {word: '24', type: 'innocent'},
  {word: '25', type: 'innocent'},
]

const useStyles = makeStyles(theme => ({
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
  const [board, setBoard] = useState(sampleBoard);

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
